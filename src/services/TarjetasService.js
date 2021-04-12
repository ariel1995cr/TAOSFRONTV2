import instanceTaos from "./AxiosIntance";
import { reactive } from "vue";

export default function dashboardService() {
  let state = reactive({
    categorias: [],
  });

  const urlRequest = import.meta.env.VITE_URL_REQUEST;

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

  const guardarTarjeta = async (data, coords) => {
    let response = await instanceTaos
      .post(`${urlRequest}api/card`, {
        data,
        coords,
      })
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        return err;
      });
    return response;
  };

  const listadoTarjetas = async (query) => {
    let response = await instanceTaos
      .get(`${urlRequest}api/card?q=${query}`)
      .then((resp) => {
        return resp.data;
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

  return {
    ObtenerCategorias,
    guardarTarjeta,
    listadoTarjetas,
    obtenerTarjeta,
    cambiarEstado,
    state,
  };
}
