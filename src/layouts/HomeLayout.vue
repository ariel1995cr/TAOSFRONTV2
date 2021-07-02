<link rel="stylesheet" href="App.scss">
<template>
  <div class="p-d-flex p-flex-column p-flex-md-row p-jc-center p-ai-center" style="height: 85vh">
    <div class="p-px-2">
      <img src="/images/logo-taos-pequeño.png" />
    </div>
    <div class="border-login-right p-px-2">
      <span class="p-text-bold p-text-left" style="max-lines: 1; font-size: clamp(1rem, -0.875rem + 8vw, 3rem);">PANEL DE ADMINISTRACION CLOUD</span>
      <p class="p-text-light p-text-left" style="max-lines: 1; font-size: clamp(1rem, -0.875rem + 8vw, 3rem);">CICLO DE OBSERVACION DE SEGURIDAD</p>
      <input-text class="p-inputtext-lg" placeholder="EMAIL" type="email" v-model="form.email" />
      <input-text class="p-inputtext-lg p-mt-3" placeholder="CONTRASEÑA" type="password" v-model="form.password" />
      <p class="p-text-right" style="font-size: 1.2em; color: gray" @click="state.modal=true">Olvide mi contrase&ntilde;a</p>
      <div class="p-grid p-jc-center p-ai-center p-px-6">
        <Button class="p-text-center p-col-8 p-col-md-4 p-jc-center" @click="iniciarSesion"
                v-if="!loading"><h5>INICIAR SESIÓN</h5></Button>
        <ProgressSpinner v-else />
      </div>
    </div>
  </div>
  <div class="p-grid">
    <div class="p-px-6 p-col-12">
      <img class="p-col-12 p-md-2"  src="/images/logo-taos.png" />
      <hr>
      <div class="p-grid" >
        <div class="p-col-12 p-md-4" style="vertical-align: center !important;">
          <img @click="router.push({name:'Home'})" width="25px" height="25px" src="/images/logoTecnoMini.jpg" />
          <span>POWERED BY TECNOSOLUCIONES</span>
        </div>
        <div class="p-col-12 p-md-4 p-mt-2 p-md-offset-4" style="vertical-align: center !important;">
          <p>
            ACERCA DE NOSOTROS | <span @click="router.push({name:'politica-de-privacidad'})">POLITICA</span> | CONTACTOS | <span>TERMINOS Y CONDICIONES</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <Dialog header="Recuperar Contraseña" v-model:visible="state.modal" :style="{width: '50vw'}" :modal="true">
    <span>Ingrese email</span>
    <InputText type="email" class="rounded" v-model="email" />
    <Button @click="cambiarContrasenaToken(email)" label="Recuperar" class="p-mt-2" />
  </Dialog>
  <Toast />
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { AuthLogin } from "../services/AuthLogin";
import CambioContrasenaService from "../services/CambioContrasenaService";
import router from "../router/index";
import ProgressSpinner from "primevue/progressspinner";
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from "primevue/button";
export default defineComponent({
  components: {
    Toast,
    ProgressSpinner,
    Dialog,
    InputText,
    Button
  },
  setup() {
    const toast = useToast();
    let loading = ref(false);
    const form = reactive({
      email: "",
      password: "",
    });
    const LoginState = AuthLogin();
    const { cambiarContrasenaToken, state } = CambioContrasenaService();

    let displayModalRecuperarContrasena = ref(true);
    let email = ref('');

    const abrirModal = () => {
      state.modal = true;
    }

    const iniciarSesion = async () => {
      loading.value = true;
      let response = await LoginState.login(form.email, form.password);
      if (response.status == 404) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: response.data.error,
          life: 3000,
        });
      }

      if (response.status == 200) {
        window.localStorage.setItem(
          "token",
          JSON.stringify(response.data.access_token)
        );
        window.localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push({ name: "Dashboard.index" });
      }
      loading.value = false;
    };

    return {
      toast,
      form,
      iniciarSesion,
      LoginState,
      loading,
      router,
      displayModalRecuperarContrasena,
      email,
      cambiarContrasenaToken,
      state,
    };
  },
});
</script>
<style lang="scss">

.vcenter-item{
  display: flex;
  align-items: center;
}

body{
  overflow-x: hidden !important;
  background: linear-gradient(gray, white 60%) no-repeat fixed !important;
}

h1, h2, h3, h4, h5, h6{
  margin: 0 !important;
}

.border-login-left{
  border-right: 2px solid #6c757d;
}
.border-login-right{
  border-left: 2px solid #6c757d;
  @media (max-width: 768px) {
    border-left: 0px;
    margin-top: 2px;
  }
}

@keyframes p-progress-spinner-color {
  100%,
  0% {
    stroke: #d62d20;
  }
  40% {
    stroke: #0057e7;
  }
  66% {
    stroke: #008744;
  }
  80%,
  90% {
    stroke: #ffa700;
  }
}
</style>
