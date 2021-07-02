import instanceTaos from "./AxiosIntance";
import { reactive } from "vue";
import { useToast } from "primevue/usetoast";
import router from "../router/index";

export default function CambioContrasenaService() {
    const urlRequest = import.meta.env.VITE_URL_REQUEST;
    let toast = useToast();
    let state = reactive({
        modal: false,
        datos: {
            token: '',
            password: '',
            password_confirmation: '',
        },
        errores: [],
    })
    const cambiarContrasenaToken = async (email) => {
        let response = await instanceTaos
            .post(`${urlRequest}api/cambiarContrasenaToken`,{
                email
            })
            .then((response) => {
                state.modal = false;
                toast.add({
                    severity: 'success',
                    summary: "Cuenta encontrada",
                    detail: response.data.message,
                    life: 3000,
                });
            })
            .catch((err) => {
                toast.add({
                    severity: "error",
                    summary: "Error",
                    detail: err.response.data.message,
                    life: 3000,
                });
            });
    };

    const cambiarContrasenaUsuario = async (datosCuenta) => {

        let response = await instanceTaos
            .post(`${urlRequest}api/cambiarContrasenaUser`,{
                ...datosCuenta
            })
            .then((resp) => {
                router.push({name:'Home'});
                toast.add({
                    severity: "success",
                    summary: "Exito",
                    detail: 'Contraseña cambiada.',
                    life: 3000,
                });
            })
            .catch((err) => {
                toast.add({
                    severity: "error",
                    summary: "Error",
                    detail: 'Hay error en los datos.',
                    life: 3000,
                });
                state.errores = err.response.data.errors;
            });
    };

    return {
        cambiarContrasenaToken,
        cambiarContrasenaUsuario,
        state
    };
}
