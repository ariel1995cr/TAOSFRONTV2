import instanceTaos from "./AxiosIntance";
import { reactive } from "vue";

export default function ItemService() {
  const urlRequest = import.meta.env.VITE_URL_REQUEST;

  const desactivarItem = async (itemCategory) => {
    let response = await instanceTaos
      .get(`${urlRequest}api/itemCategory/deactivate/${itemCategory}`)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        return err;
      });
    return response;
  };

  const activarItem = async (itemCategory) => {
    let response = await instanceTaos
      .get(`${urlRequest}api/itemCategory/activate/${itemCategory}`)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        return err;
      });
    return response;
  };

  const agregarItem = async (data) => {
    let response = await instanceTaos
      .post(`${urlRequest}api/item`, {
        data,
      })
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        return err.response;
      });
    return response;
  };

  return {
    desactivarItem,
    activarItem,
    agregarItem,
  };
}
