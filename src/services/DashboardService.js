import instanceTaos from "./AxiosIntance";
import { reactive } from "vue";

export default function dashboardService() {
  let state = reactive({
    numeroTarjetas: 0,
    numeroUsuarios: 0,
    marcadores : [],
    data: [],
  });

  const urlRequest = import.meta.env.VITE_URL_REQUEST;

  const ObtenerEstaditica = async (mes = null, año = null) => {
    await instanceTaos
      .get(`${urlRequest}api/estadistica`)
      .then((resp) => {
        state.numeroTarjetas = resp.data.CardTotal;
        state.numeroUsuarios = resp.data.UsersTotal;
        state.marcadores = resp.data.marcadores;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ObtenerEstaditica2 = async (mes = null, año = null) => {
    let data = await instanceTaos
      .get(`${urlRequest}api/StaticsData`)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return data;
  };

  return {
    ObtenerEstaditica,
    ObtenerEstaditica2,
    state,
  };
}
