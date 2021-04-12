import instanceTaos from "./AxiosIntance";

export default function ComentariosService() {
  const urlRequest = import.meta.env.VITE_URL_REQUEST;

  const obtenerComentarios = async (id) => {
    let response = await instanceTaos
      .get(`${urlRequest}api/card/${id}/getComment`)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(error);
      });
    return response;
  };

  const agregarComentarios = async (id, comentario) => {
    let response = await instanceTaos
      .post(`${urlRequest}api/card/${id}/agregarComentario`, {
        comentario,
      })
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
    obtenerComentarios,
    agregarComentarios,
  };
}
