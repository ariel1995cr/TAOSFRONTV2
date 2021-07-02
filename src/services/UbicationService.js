import instanceTaos from "./AxiosIntance";
import { reactive } from "vue";

export default function UbicationService() {
  const urlRequest = import.meta.env.VITE_URL_REQUEST;
  const state = reactive({
    ciudades: [],
    error: false,
    loading: false,
  });

  const ObtenerListadoCiudades = async (idCard) => {
    let response = await instanceTaos
      .get(`${urlRequest}api/listCountries`)
      .then((resp) => {
        state.ciudades = resp.data;
      })
      .catch((err) => {
        console.log(err);
        state.error = err.response;
      });
    return response;
  };

  const buscarCiudad = async (ciudad) => {
    let response = await instanceTaos
      .get(`${urlRequest}api/ciudad/${ciudad}`)
      .then((resp) => {
        state.ciudades = resp.data;
      })
      .catch((err) => {
        console.log(err);
        state.error = err.response;
      });
    return response;
  };

  return {
    ObtenerListadoCiudades,
    buscarCiudad,
    state,
  };
}
