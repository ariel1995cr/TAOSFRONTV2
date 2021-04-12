import instanceTaos from "./AxiosIntance";
import { reactive } from "vue";
import { useToast } from "primevue/usetoast";

export default function ResponsableService() {
  const urlRequest = import.meta.env.VITE_URL_REQUEST;
  const toast = useToast();
  const addToast = (type, summary, detail) => {
    toast.add({
      severity: type,
      summary: summary,
      detail: detail,
      life: 3000,
    });
  };

  const state = reactive({
    error: false,
    response: null,
    loading: false,
    responsables: [],
  });

  const ObtenerResponsables = async (idCard) => {
    await instanceTaos
      .get(`${urlRequest}api/card/${idCard}/obtenerResponsables`)
      .then((resp) => {
        state.responsables = resp.data;
      })
      .catch((err) => {
        console.log(err);
        state.responsables = [];
      });
  };

  const eliminarResponsable = async (idCard, idUser) => {
    await instanceTaos
      .delete(`${urlRequest}api/card/${idCard}/responsable/${idUser}`)
      .then((resp) => {
        state.response = resp;
        state.error = false;
        addToast(
          "success",
          "Responsable eliminado correctamente.",
          "El responsable fue eliminado correctamente de la tarjeta."
        );
      })
      .catch((err) => {
        state.error = true;
        state.response = err.response;
        addToast(
          "error",
          "Error al eliminar responsable.",
          "Algo no salio bien, por favor intente nuevamente.."
        );
      });
    ObtenerResponsables(idCard);
  };

  const AgregarResponsable = async (idCard, data) => {
    let responsables = data.value;
    let response = await instanceTaos
      .put(`${urlRequest}api/card/${idCard}/asignarResponsable`, {
        responsables,
      })
      .then((resp) => {
        state.response = resp;
        state.error = false;
      })
      .catch((err) => {
        state.error = true;
        state.response = err.response;
      });
    ObtenerResponsables(idCard);
  };

  return {
    ObtenerResponsables,
    eliminarResponsable,
    AgregarResponsable,
    state,
  };
}
