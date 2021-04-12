import instanceTaos from "./AxiosIntance";
import { reactive } from "vue";

export default function CategoryService() {
  const urlRequest = import.meta.env.VITE_URL_REQUEST;

  const agregarCategoria = async (nombre) => {
    let response = await instanceTaos
      .post(`${urlRequest}api/categories`, {
        nombre,
      })
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        return err.response;
      });
    return response;
  };

  const allCategoriesWithOutItem = async () => {
    let response = await instanceTaos
      .get(`${urlRequest}api/categoriesWithOutItem`)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        return err.response;
      });
    return response;
  };

  return {
    agregarCategoria,
    allCategoriesWithOutItem,
  };
}
