<template>
  <div class="bg-auto bg-center bg-gray-600 min-h-screen bg-black bg-opacity-40">
    <div class="grid justify-items-center place-content-center h-1/2">
      <div class="col-span-6 m-auto mt-32">
        <h1 class="text-2xl text-white text-center mb-6">Cambiar Contraseña</h1>
        <form @submit.prevent="">
          <label class="text-white text-lg">Contraseña</label>
          <InputText class="rounded" type="password" v-model="state.datos.password" />
          <p class="text-white" v-if="state.errores.password">
            {{state.errores.password[0]}}
          </p>
          <label class="text-white text-lg">Confirmar contraseña</label>
          <InputText class="rounded" type="password" v-model="state.datos.password_confirmation" />
          <button
              class="p-2 transition duration-500 mt-6 ease-in-out bg-white rounded text hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110"
              @click="cambiarContrasenaUsuario(state.datos)"
          >
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
    <Toast />
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Toast from "primevue/toast";
import CambioContrasenaService from "../../services/CambioContrasenaService";
export default {
  name: "RecuperarContrasenaForm",
  props:{
    token: String,
  },
  components:{
    InputText,
    Toast
  },
  setup(props){
    const { cambiarContrasenaUsuario, state } = CambioContrasenaService();

    state.datos.token = props.token;
    return {
      cambiarContrasenaUsuario,
      state
    }
  },
}
</script>
<style lang="scss" scoped>
@import 'src/index.scss';
</style>