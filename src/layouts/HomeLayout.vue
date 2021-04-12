<template>
  <div
    class="bg-auto bg-center bg-gray-600 min-h-screen"
    style="background-image: url('/images/backgound-petroleo.jpg')"
  >
    <div class="flex flex-col bg-black min-h-screen bg-opacity-40">
      <div class="m-auto">
        <div class="bg-white opacity-100 rounded p-2">
          <img class="object-contain max-h-48" src="/images/logo-taos.png" />
        </div>
        <div>
          <p
            class="text-center text-white xl:text-8xl lg:text-6xl md:text-xl sm:text-base"
          >
            Panel de Administracion Cloud
          </p>
          <p
            class="text-center text-white xl:text-6xl lg:text-xl md:text-base sm:text-sm"
          >
            Ciclo de Observacion de Seguridad
          </p>
        </div>
        <div class="rounded m-auto w-full lg:w-3/6">
          <form @submit.prevent="" class="flex flex-col p-12 w-full">
            <div class="flex flex-col">
              <label class="text-white text-xl">E-mail</label>
              <input
                type="email"
                placeholder="Email"
                class="rounded text-black focus:border-black"
                v-model="form.email"
              />
            </div>
            <div class="flex flex-col mt-2">
              <label class="text-white text-xl">Contraseña</label>
              <input
                type="password"
                placeholder="Contraseña"
                class="rounded text-black focus:border-black"
                v-model="form.password"
              />
            </div>
            <div class="flex flex-col mt-2">
              <button
                class="p-2 transition duration-500 mt-2 ease-in-out bg-white rounded text-2xl hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110"
                @click="iniciarSesion"
                v-if="!loading"
              >
                Iniciar Sesión
              </button>
              <ProgressSpinner v-else />
            </div>
          </form>
        </div>
      </div>
      <div class="m-auto">
        <p class="text-white text-center text-2xl">Powered By</p>
        <div class="bg-white rounded p-2">
          <img class="object-contain max-h-48" src="/images/logo-tecno.png" />
        </div>
      </div>
    </div>
    <Toast />
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { AuthLogin } from "../services/AuthLogin";
import router from "../router/index";
import ProgressSpinner from "primevue/progressspinner";

export default defineComponent({
  components: {
    Toast,
    ProgressSpinner,
  },
  setup() {
    const toast = useToast();
    let loading = ref(false);
    const form = reactive({
      email: "",
      password: "",
    });
    const LoginState = AuthLogin();

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
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../index.scss";
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
