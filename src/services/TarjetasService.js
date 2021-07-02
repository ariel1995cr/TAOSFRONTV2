import instanceTaos from "./AxiosIntance";
import { reactive } from "vue";
import { useToast } from "primevue/usetoast";

export default function dashboardService() {
  let state = reactive({
    categorias: [],
    cards: {
      current_page: 1,
      data: [],
      first_page: "",
      next_page: "",
      prev_page: "",
      from: 1,
      to: 15,
      per_page: 15,
        total: "",
    },
    loading: false,
  });

  const urlRequest = import.meta.env.VITE_URL_REQUEST;

  const toast = useToast();

  const ObtenerCategorias = async () => {
    await instanceTaos
      .get(`${urlRequest}api/categories`)
      .then((resp) => {
        state.categorias = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const eliminarCategoria = async(categoriaId) => {
    let response = await instanceTaos
        .delete(`${urlRequest}api/categories/${categoriaId}`)
        .then((resp) => {
          ObtenerCategorias();
          toast.add({
            severity: "success",
            summary: "Categoria eliminada correctamente.",
            detail: "Se elimino categoria y subcategorias correctamente.",
            life: 5000,
          });
        })
        .catch((err) => {
        });
    return response;
  }

  const guardarTarjeta = async (data, coords, imagen = null) => {
    const formData = new FormData();
    if(imagen != null){
      console.log(imagen);
      for (const i of Object.keys(imagen)) {
        console.log(imagen[i]);
        formData.append('files', imagen[i])
      }
    }
    formData.append('data', JSON.stringify(data));
    formData.append('coords', JSON.stringify(coords));
    let response = await instanceTaos
      .post(`${urlRequest}api/card`,formData)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        return err;
      });
    return response;
  };

  const listadoTarjetas = async (params, url = state.cards.first_page) => {
      console.log(params);

    if (url == "") {
      url = `${urlRequest}api/cardv2?page=1`;
    }
    let response = await instanceTaos
      .get(`${url}&q=${JSON.stringify(params)}`)
      .then((resp) => {
        state.cards.data = resp.data.data;
        state.cards.current_page = resp.data.current_page;
        state.cards.first_page = resp.data.first_page_url;
        state.cards.next_page = resp.data.next_page_url;
        state.cards.prev_page = resp.data.prev_page_url;
        state.cards.from = resp.data.from;
        state.cards.to = resp.data.to;
        state.cards.per_page = resp.data.per_page;
        state.cards.total = resp.data.total;
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  };

    const listadoMisAsignaciones = async (params, url = state.cards.first_page) => {

        if (url == "") {
            url = `${urlRequest}api/getMyAssignments?page=1`;
        }
        let response = await instanceTaos
            .get(`${url}&q=${JSON.stringify(params)}`)
            .then((resp) => {
                state.cards.data = resp.data.data;
                state.cards.current_page = resp.data.current_page;
                state.cards.first_page = resp.data.first_page_url;
                state.cards.next_page = resp.data.next_page_url;
                state.cards.prev_page = resp.data.prev_page_url;
                state.cards.from = resp.data.from;
                state.cards.to = resp.data.to;
                state.cards.per_page = resp.data.per_page;
                state.cards.total = resp.data.total;
            })
            .catch((err) => {
                console.log(err);
            });
        return response;
    };

  const listadoMisTarjetas = async (query, url = state.cards.first_page) => {
    if (url == "") {
      url = `${urlRequest}api/myCards?page=1`;
    }
    let response = await instanceTaos
        .get(`${url}&q=${query}`)
        .then((resp) => {
          state.cards.data = resp.data.data;
          state.cards.current_page = resp.data.current_page;
          state.cards.first_page = resp.data.first_page_url;
          state.cards.next_page = resp.data.next_page_url;
          state.cards.prev_page = resp.data.prev_page_url;
          state.cards.from = resp.data.from;
          state.cards.to = resp.data.to;
          state.cards.per_page = resp.data.per_page;
        })
        .catch((err) => {
          console.log(err);
        });
    return response;
  };

  const obtenerTarjeta = async (id) => {
    let response = await instanceTaos
      .get(`${urlRequest}api/card/${id}`)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  };

  const cambiarEstado = async (id) => {
    let response = await instanceTaos
      .get(`${urlRequest}api/card/${id}/cambiarEstado`)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
    return response;
  };


  const guardarFormatoTarjeta = async() => {
    let errorFormato = false;
    state.categorias.forEach(categorias => {
      categorias.items.forEach(item=>{
        if((item.tipo_campo == 'checkbox' || item.tipo_campo == 'radio' || item.tipo_campo == 'select') && item.valores_posibles?.length <= 0){
          toast.add({
            severity: "error",
            summary: "Encontramos un error",
            detail: "Valores posibles no puede estar vacio.",
            life: 5000,
          });
          errorFormato = true;
          return;
        }
      })
    })

    if(!errorFormato){
      await instanceTaos
          .post(`${urlRequest}api/card/formato`,{
            ...state.categorias
          })
          .then((resp) => {
            toast.add({
              severity: "success",
              summary: "Formato de tarjeta actualizada.",
              detail: "Los cambios en la tarjeta se actualizaron correctamente.",
              life: 5000,
            });
          })
          .catch((err) => {
            console.log(err);
          });
    }

  }

  return {
        ObtenerCategorias,
        guardarTarjeta,
        listadoTarjetas,
        obtenerTarjeta,
        cambiarEstado,
        guardarFormatoTarjeta,
        state,
        eliminarCategoria,
        listadoMisTarjetas,
        listadoMisAsignaciones,
  };
}
