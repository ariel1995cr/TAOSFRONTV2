<template>
  <div class="p-fluid p-formgrid p-grid">
    <div class="p-field p-col-12 p-md-6">
      <label class="p-text-bold" for="dni">DNI</label>
      <InputMask v-model.trim="user.dni" mask="99999999" />
      <span class="error" v-if="state.response?.errors.dni">
        {{ state.response?.errors.dni[0] }}
      </span>
    </div>
    <div class="p-field p-col-12 p-md-6">
      <label class="p-text-bold">Nombre</label>
      <InputText v-model.trim="user.nombre" type="text" />
      <span class="error" v-if="state.response?.errors.nombre">
        {{ state.response?.errors.nombre[0] }}
      </span>
    </div>
    <div class="p-field p-col-12 p-md-6">
      <label class="p-text-bold">Apellido</label>
      <InputText v-model.trim="user.apellido" type="text" />
      <span class="error" v-if="state.response?.errors.apellido">
        {{ state.response?.errors.apellido[0] }}
      </span>
    </div>
    <div class="p-field p-col-12 p-md-6">
      <label class="p-text-bold">Email</label>
      <InputText v-model.trim="user.email" type="text" />
      <span class="error" v-if="state.response?.errors.email">
        {{ state.response?.errors.email[0] }}
      </span>
    </div>
  </div>
</template>

<script>
import InputMask from "primevue/inputmask";
import InputText from "primevue/inputtext";
import Autocomplete from "primevue/autocomplete";
import Button from "primevue/button";
import { computed, ref } from "vue";
import UserService from "../services/UserService";
import UbicationService from "../services/UbicationService";

export default {
  components: {
    InputMask,
    InputText,
    Autocomplete,
    Button,
  },
  props: {
    user: Object,
    state: Array,
  },
  setup(props) {
    let usuario = ref(props.user);
    let state = ref(props.state);
    const { state: stateUser, guardarUsuario } = UserService();
    const { buscarCiudad, state: stateCiudades } = UbicationService();
    let ciudades = ref("");

    const searchCity = async (event) => {
      await buscarCiudad(event.query);
    };

    return {
      usuario,
      searchCity,
      stateCiudades,
      guardarUsuario,
      stateUser,
      ciudades,
      state,
    };
  },
};
</script>

<style>
.error {
  color: red;
  font-style: bold;
}
</style>
