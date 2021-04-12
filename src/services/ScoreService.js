import instanceTaos from "./AxiosIntance";
import { reactive } from "vue";

export default function ScoreService() {
  const urlRequest = import.meta.env.VITE_URL_REQUEST;

  const obtenerPuntajeDado = async (id) => {
    let response = await instanceTaos
      .get(`${urlRequest}api/myScoreCard/${id}`)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(error);
      });
    return response;
  };

  const puntarCard = async (id, puntaje) => {
    let response = await instanceTaos
      .get(`${urlRequest}api/card/calificar/${id}/${puntaje}`)
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
    obtenerPuntajeDado,
    puntarCard,
  };
}
