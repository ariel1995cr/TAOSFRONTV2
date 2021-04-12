import instanceTaos from "./AxiosIntance";
import { reactive } from "vue";
import { useToast } from "primevue/usetoast";

export default function UserService() {
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
    usuarios: [],
    roles: [],
    response: null,
    error: false,
    loading: false,
  });

  const ObtenerListadoResponsables = async (idCard) => {
    let response = await instanceTaos
      .get(`${urlRequest}api/card/${idCard}/listadoResponsables`)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  };

  const obtenerUsuarios = async (query) => {
    await instanceTaos
      .get(`${urlRequest}api/users?q=${query}`)
      .then((resp) => {
        state.usuarios = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const obtenerRoles = async () => {
    await instanceTaos
      .get(`${urlRequest}api/rolesPermitidos`)
      .then((resp) => {
        state.roles = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const actualizarUsuario = async (usuario) => {
    state.loading = true;
    await instanceTaos
      .post(`${urlRequest}api/users/${usuario.id}`, {
        usuario,
      })
      .then((resp) => {
        console.log(resp);
        addToast(
          "success",
          "Usuario actualizado correctamente.",
          resp.data.msg
        );
      })
      .catch((err) => {
        console.log(err);
        addToast(
          "error",
          "Usuario no actualizado.",
          "Ocurrio un error intente nuevamente."
        );
      });
    state.loading = false;
    obtenerUsuarios("");
  };

  return {
    ObtenerListadoResponsables,
    obtenerUsuarios,
    obtenerRoles,
    actualizarUsuario,
    state,
  };
}
