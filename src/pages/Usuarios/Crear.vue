<template>
  <h1>Crear Usuario</h1>
  <hr />
  <form class="p-p-3" autocomplete="off">
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12 p-md-6">
        <label for="Numero de empleado">Numero de empleado</label>
        <InputText
          v-model.trim="usuario.employeeNumber"
          id="Numero de empleado"
          type="text"
        />
        <span
          style="color: red"
          v-if="stateUser.response && stateUser.response['employeeNumber']"
        >
          {{ stateUser.response["employeeNumber"][0] }}
        </span>
      </div>
      <div class="p-field p-col-12 p-md-6">
        <label for="Nombre">Nombre</label>
        <InputText
          v-model.trim="usuario.nombre"
          id="Nombre"
          type="text"
        />
        <span
          style="color: red"
          v-if="stateUser.response && stateUser.response['nombre']"
        >
          {{ stateUser.response["nombre"][0] }}
        </span>
      </div>
      <div class="p-field p-col-12 p-md-6">
        <label for="Apellido">Apellido</label>
        <InputText
            v-model.trim="usuario.apellido"
            id="Apellido"
            type="text"
        />
        <span
            style="color: red"
            v-if="stateUser.response && stateUser.response['apellido']"
        >
          {{ stateUser.response["apellido"][0] }}
        </span>
      </div>
      <div class="p-field p-col-12 p-md-6">
        <label for="Email">Email</label>
        <InputText v-model.trim="usuario.email" id="Email" type="text" />
        <span
          style="color: red"
          v-if="stateUser.response && stateUser.response['email']"
        >
          {{ stateUser.response["email"][0] }}
        </span>
      </div>
      <div class="p-field p-col-12 p-md-6">
        <label for="DNI">DNI</label>
        <InputMask
          v-model.trim="usuario.dni"
          id="DNI"
          type="text"
          mask="99999999"
          slotChar="99999999"
        />
        <span
          style="color: red"
          v-if="stateUser.response && stateUser.response['dni']"
        >
          {{ stateUser.response["dni"][0] }}
        </span>
      </div>
      <div class="p-field p-col-12 p-md-6">
        <label for="rol">Rol</label>
        <Dropdown
          v-model="usuario.rol"
          :options="stateUser.roles"
          optionLabel="nombre"
          placeholder="Seleccionar rol"
        />
        <span
          style="color: red"
          v-if="stateUser.response && stateUser.response['rol']"
        >
          {{ stateUser.response["rol"][0] }}
        </span>
      </div>
      <div class="p-field p-col-12 p-md-6">
        <label for="ciudad">Ciudad donde vive</label>
        <Autocomplete
          id="ciudad"
          v-model="usuario.ciudad"
          :suggestions="stateCiudades.ciudades"
          @complete="searchCity($event)"
          field="ciudades"
          autocomplete="off"
        />
        <span
          style="color: red"
          v-if="stateUser.response && stateUser.response['ciudad']"
        >
          {{ stateUser.response["ciudad"][0] }}
        </span>
        <span
          style="color: red"
          v-if="stateUser.response && stateUser.response['ciudad.city_id']"
        >
          {{ stateUser.response["ciudad"][0] }}
          <br />
        </span>
      </div>
      <div class="p-field p-col-12 p-lg-6">
        <label for="rol">Trabaja en</label>
        <Dropdown
          v-model="usuario.work_city_id"
          :options="stateLocation.locaciones"
          optionLabel="id"
          :filter="true"
          :filterFields="[
            'id',
            'city.name',
            'city.state.name',
            'city.state.country.name',
          ]"
          placeholder="Seleccionar ciudad de trabajo"
          style="width: 100%"
        >
          <template #value="slotProps">
            <div class="p-dropdown-car-value" v-if="slotProps.value">
              <span
                >{{ slotProps.value.id }} - {{ slotProps.value.city.name }},
                {{ slotProps.value.city.state.name }},
                {{ slotProps.value.city.state.country.name }}</span
              >
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="p-dropdown-car-option">
              <span
                >{{ slotProps.option.id }} - {{ slotProps.option.city.name }},
                {{ slotProps.option.city.state.name }},
                {{ slotProps.option.city.state.country.name }}</span
              >
            </div>
          </template>
        </Dropdown>
        <span
          style="color: red"
          v-if="stateUser.response && stateUser.response['work_city_id']"
        >
          {{ stateUser.response["work_city_id"][0] }}
          <br />
        </span>
      </div>
    </div>
    <div class="p-grid p-jc-end">
      <Button
        @click="guardarUsuario(usuario)"
        label="Guardar"
        class="p-button-outlined"
      />
    </div>
  </form>
</template>

<script>
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Autocomplete from "primevue/autocomplete";
import UserService from "../../services/UserService";
import UbicationService from "../../services/UbicationService";
import LocationService from "../../services/LocationService";
import { onMounted, reactive, ref } from "vue";
import InputMask from "primevue/inputmask";
import Button from "primevue/button";

export default {
  components: {
    InputMask,
    InputText,
    Dropdown,
    Autocomplete,
    Button,
  },
  setup() {
    const { obtenerRoles, state: stateUser, guardarUsuario } = UserService();
    const { buscarCiudad, state: stateCiudades } = UbicationService();
    const {
      obtenerLocacionesPorCiudad,
      obtenerLocaciones,
      state: stateLocation,
    } = LocationService();

    let ciudades = ref("");
    let usuario = reactive({
      employeeNumber: "",
      nombre: "",
      apellido: "",
      email: "",
      dni: "",
      ciudad: "",
      rol: null,
      work_city_id: null,
    });

    onMounted(async () => {
      await obtenerRoles();
      await obtenerLocaciones();
    });

    const searchCity = async (event) => {
      await buscarCiudad(event.query);
    };

    return {
      obtenerRoles,
      stateUser,
      stateCiudades,
      searchCity,
      usuario,
      ciudades,
      guardarUsuario,
      stateLocation,
    };
  },
};
</script>

<style></style>
