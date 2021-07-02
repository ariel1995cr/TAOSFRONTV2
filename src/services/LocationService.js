import instanceTaos from "./AxiosIntance";
import { reactive } from "vue";
import { useToast } from "primevue/usetoast";

export default function LocationService() {
  const toast = useToast();
  const addToast = (type, summary, detail) => {
    toast.add({
      severity: type,
      summary: summary,
      detail: detail,
      life: 3000,
    });
  };
  const urlRequest = import.meta.env.VITE_URL_REQUEST;
  const state = reactive({
    locaciones: [],
    response: [],
    error: false,
    loading: false,
    openModal: false,
    titleModal: "",
    nuevo: false,
  });

  const obtenerLocaciones = async () => {
    state.loading = true;
    let response = await instanceTaos
      .get(`${urlRequest}api/location`)
      .then((resp) => {
        state.locaciones = resp.data;
      })
      .catch((err) => {
        state.response = err.response;
      });
    state.loading = false;
  };

  const obtenerLocacionesPorCiudad = async (state_id) => {
    state.loading = true;
    let response = await instanceTaos
      .get(`${urlRequest}api/location/LocationByState/${state_id}`)
      .then((resp) => {
        state.locaciones = resp.data;
      })
      .catch((err) => {
        state.response = err.response;
      });
    state.loading = false;
  };

  const guardarlocacion = async (data) => {
    state.loading = true;
    let response = await instanceTaos
      .post(`${urlRequest}api/location`, {
        ...data,
      })
      .then((resp) => {
        obtenerLocaciones();
        addToast("success", "Locacion agregada correctamente.", resp.data.msg);
        state.openModal = false;
      })
      .catch((err) => {
        state.response = err.response.data;
        addToast(
          "error",
          "Error al agregar Locacion.",
          "Verifique los errores indicados."
        );
      });
    state.loading = false;
  };

  const updateLocacion = async (locacion) => {
    state.loading = true;
    let response = await instanceTaos
        .put(`${urlRequest}api/location/${locacion.nombre_anterior}`, {
          ...locacion,
        })
        .then((resp) => {
          obtenerLocaciones();
          addToast("success", "Locacion agregada correctamente.", resp.data.msg);
          state.openModal = false;
        })
        .catch((err) => {
          state.response = err.response.data;
          addToast(
              "error",
              "Error al agregar Locacion.",
              "Verifique los errores indicados."
          );
        });
    state.loading = false;
  }

  const borrarLocacion = async (locacion) => {
    state.loading = true;
    let response = await instanceTaos
      .delete(`${urlRequest}api/location/${locacion}`)
      .then((resp) => {
        obtenerLocaciones();
        addToast("success", "Locacion borrada correctamente.", resp.data.msg);
      })
      .catch((err) => {
        state.response = err.response.data;
        addToast(
          "error",
          "Error al borrar Locacion.",
          "Verifique los errores indicados."
        );
      });
    state.loading = false;
  };

  const activarLocacion = async (locacion) => {
    state.loading = true;
    let response = await instanceTaos
        .patch(`${urlRequest}api/location/${locacion}`)
        .then((resp) => {
          obtenerLocaciones();
          addToast("success", "Locacion activada correctamente.", resp.data.msg);
        })
        .catch((err) => {
          state.response = err.response.data;
          addToast(
              "error",
              "Error al reactivar locacion.",
              "Verifique los errores indicados."
          );
        });
    state.loading = false;
  };

  return {
    obtenerLocaciones,
    obtenerLocacionesPorCiudad,
    guardarlocacion,
    borrarLocacion,
    updateLocacion,
    activarLocacion,
    state,
  };
}
