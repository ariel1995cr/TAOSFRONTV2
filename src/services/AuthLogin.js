import instanceTaos from "./AxiosIntance";

import { reactive } from "vue";

export const AuthLogin = () => {
  const state = reactive({
    data: null,
    loading: true,
    error: false,
    messageError: "",
  });

  const urlRequest = import.meta.env.VITE_URL_REQUEST;
  const login = async (email, password) => {
    let response = await instanceTaos
      .post(`${urlRequest}api/login`, {
        email,
        password,
      })
      .then((resp) => {
        return resp;
      })
      .catch((e) => {
        return e.response;
      });
    return response;
  };

  return {
    state,
    login,
  };
};
