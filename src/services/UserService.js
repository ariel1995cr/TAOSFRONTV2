import instanceTaos from "./AxiosIntance";
import { reactive } from "vue";
import { useToast } from "primevue/usetoast";
import router from "../router/index";

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
    showModal: false,
    responseError: []
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
        ...usuario,
      })
      .then((resp) => {
        state.showModal = false;
        addToast(
          "success",
          "Usuario actualizado correctamente.",
          resp.data.msg
        );
      })
      .catch((err) => {
        state.responseError = err.response.data.errors;
        addToast(
          "error",
          "Usuario no actualizado.",
          "Ocurrio un error intente nuevamente."
        );
      });
    state.loading = false;
    obtenerUsuarios("");
  };

  const guardarUsuario = async (data) => {
    await instanceTaos
      .post(`${urlRequest}api/user`, {
        ...data,
      })
      .then((resp) => {
        addToast("success", "Usuario creado correctamente.", resp.data.msg);
        state.error = false;
        router.push({ name: "Dashboard.Usuarios", query: { q: "" } });
      })
      .catch((err) => {
        state.response = err.response.data;
        state.error = true;
      });
  };

  const actualizarPerfil = async (data) => {
    await instanceTaos
      .post(`${urlRequest}api/perfil`, {
        ...data,
      })
      .then((resp) => {
        state.showModal = false;
        state.responseError = [];
        addToast(
          "success",
          "Usuario actualizado correctamente.",
          resp.data.msg
        );
        state.error = false;
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err.response.data);
        state.responseError = err.response.data.errors;
        state.error = true;
      });
  };

  const actualizarImagenPerfil = async (imagen) => {
    await instanceTaos
      .post(`${urlRequest}api/imagenPerfil`, {
        imagen,
      })
      .then((resp) => {
        addToast("success", "Imagen actualizada correctamente.", resp.data.msg);
        state.error = false;
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        window.location.href = "/";
      })
      .catch((err) => {
        state.response = err.response.data;
        state.error = true;
      });
  };

  return {
    ObtenerListadoResponsables,
    obtenerUsuarios,
    obtenerRoles,
    actualizarUsuario,
    guardarUsuario,
    actualizarPerfil,
    actualizarImagenPerfil,
    state,
  };
}
