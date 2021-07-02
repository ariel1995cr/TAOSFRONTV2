<template>
  <DataTable
    :value="stateUser.usuarios"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    ref="dt"
    :loading="stateUser.loading"
    currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords}"
  >
    <template #header>
      <div class="p-d-flex p-jc-between p-ai-center">
        <h5 class="p-m-0">Usuarios</h5>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            :value="$route.query.q"
            v-debounce:1000ms="onInput"
            placeholder="Buscar"
          />
        </span>
      </div>
    </template>
    <template #empty>
      No se encontraron usuarios cargadas.
    </template>
    <template #loading>
      Cargando usuarios. Espere por favor.
    </template>
    <Column
      field="nombre"
      header="NOMBRE"
      :sortable="true"
    ></Column>
    <Column
        field="apellido"
        header="APELLIDO"
        :sortable="true"
    ></Column>
    <Column field="employeeNumber" header="NUMERO DE EMPLEADO" :sortable="true">
      <template #body="slotProps">
        {{
          slotProps.data.employeeNumber
            ? slotProps.data.employeeNumber
            : "No disponible"
        }}
      </template></Column
    >
    <Column field="rol.nombre" header="ROL" :sortable="true"></Column>
    <Column field="city.country.name" header="PAÍS" :sortable="true"></Column>
    <Column
      field="city.state.name"
      header="PROVINCIA"
      :sortable="true"
    ></Column>
    <Column field="city.name" header="CIUDAD" :sortable="true"></Column>
    <Column header="ACCIONES">
      <template #body="slotProps">
        <i
          class="pi pi-pencil"
          v-tooltip="'Editar'"
          @click="abrirModal('editar', slotProps.data)"
        ></i>
      </template>
    </Column>
  </DataTable>
  <Dialog
    :header="titleModal"
    v-model:visible="stateUser.showModal"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <div class="p-grid">
      <div class="p-field p-col-12 p-lg-6">
        <label for="Nombre">Nombre</label>
        <InputText
          v-model.trim="usuarioSeleccionado.nombre"
          id="Nombre"
          type="text"
        />
        <div style="color: red" v-if="stateUser.responseError?.nombre">
          {{stateUser.responseError.nombre[0]}}
        </div>
      </div>
      <div class="p-field p-col-12 p-lg-6">
        <label for="Apellido">Apellido</label>
        <InputText
            v-model.trim="usuarioSeleccionado.apellido"
            id="Apellido"
            type="text"
        />
        <div style="color: red" v-if="stateUser.responseError?.apellido">
          {{stateUser.responseError.apellido[0]}}
        </div>
      </div>
      <div class="p-field p-col-12 p-lg-6">
        <label for="DNI">DNI</label>
        <InputText
          v-model.trim="usuarioSeleccionado.dni"
          id="DNI"
          type="text"
        />
        <div style="color: red" v-if="stateUser.responseError?.dni">
          {{stateUser.responseError.dni[0]}}
        </div>
      </div>
      <div class="p-field p-col-12 p-lg-6">
        <label for="numeroEmpleado">Numero de empleado</label>
        <InputText
          v-model.trim="usuarioSeleccionado.employeeNumber"
          id="numeroEmpleado"
          type="text"
        />
        <div style="color: red" v-if="stateUser.responseError?.employeeNumber">
          {{stateUser.responseError.employeeNumber[0]}}
        </div>
      </div>
      <div class="p-field p-col-12 p-lg-6">
        <label for="email">Email</label>
        <InputText
          v-model.trim="usuarioSeleccionado.email"
          id="email"
          type="text"
        />
        <div style="color: red" v-if="stateUser.responseError?.email">
          {{stateUser.responseError.email[0]}}
        </div>
      </div>
      <div class="p-field p-col-12 p-lg-6">
        <label for="ciudadTrabajo">Vive en la ciudad</label>
        <br />
        <AutoComplete
          style="width: 100%"
          v-model="usuarioSeleccionado.city"
          :suggestions="stateUbication.ciudades"
          @complete="changeDondeVive($event)"
          field="ciudades"
        />
        <div style="color: red" v-if="stateUser.responseError?.city">
          {{stateUser.responseError.city[0]}}
        </div>
      </div>
      <div class="p-field p-col-12 p-lg-6">
        <label for="rol">Rol</label>
        <Dropdown
          v-model="usuarioSeleccionado.rol"
          :options="stateUser.roles"
          optionLabel="nombre"
          placeholder="Seleccionar rol"
          style="width: 100%"
        />
      </div>
      <div class="p-field p-col-12 p-lg-6">
        <label for="rol">Trabaja en</label>
        <Dropdown
          v-model="usuarioSeleccionado.work_city_id"
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
        <div style="color: red" v-if="stateUser.responseError?.work_city_id">
          {{stateUser.responseError.work_city_id[0]}}
        </div>
      </div>
    </div>
    <template #footer>
      <Button
        label="Cerrar"
        icon="pi pi-times"
        @click="cerrarModal"
        class="p-button-text"
      />
      <Button
        label="Actualizar"
        @click="updateUser()"
        icon="pi pi-check"
        v-if="modoModal == 'editar'"
      />
      <Button label="Crear" icon="pi pi-check" v-if="modoModal == 'crear'" />
    </template>
  </Dialog>
</template>

<script>
import AutoComplete from "primevue/autocomplete";
import DataTable from "primevue/datatable";
import Dialog from "primevue/dialog";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import CascadeSelect from "primevue/cascadeselect";
import UserService from "../../services/UserService";
import UbicationService from "../../services/UbicationService";
import LocationService from "../../services/LocationService";
import { onMounted, ref } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import Dropdown from "primevue/dropdown";
import { useRouter, useRoute } from "vue-router";
export default {
  components: {
    AutoComplete,
    Column,
    DataTable,
    ProgressSpinner,
    InputText,
    Dialog,
    Button,
    CascadeSelect,
    Dropdown,
  },
  setup() {
    const {
      obtenerUsuarios,
      obtenerRoles,
      state: stateUser,
      actualizarUsuario,
    } = UserService();
    const {
      ObtenerListadoCiudades,
      state: stateUbication,
      buscarCiudad,
    } = UbicationService();
    const {
      obtenerLocacionesPorCiudad,
      obtenerLocaciones,
      state: stateLocation,
    } = LocationService();
    const dt = ref(null);
    let loading = ref(true);
    let showModal = ref(false);
    let modoModal = ref("");
    let titleModal = ref("");
    let usuarioSeleccionado = ref({});

    const router = useRouter();
    const route = useRoute();

    const onInput = (val, e) => {
      router.replace({
        query: {
          q: val,
        },
      });
    };

    onMounted(async () => {
      stateUser.loading = true;
      await obtenerUsuarios(route.query.q);
      await ObtenerListadoCiudades();
      await obtenerRoles();
      await obtenerLocaciones();
      stateUser.loading = false;
    });

    const abrirModal = (modo, user) => {
      modoModal.value = modo;
      if (modo == "editar") {
        usuarioSeleccionado.value = { ...user };
        //usuarioSeleccionado.value.city = city;
        usuarioSeleccionado.value.city = {
          ciudades:
            user.city.name +
            ", " +
            user.city.state.name +
            " ," +
            user.city.country.name,
          city_id: user.city.id,
        };
        stateUser.showModal = true;
        titleModal.value = "Editar Usuario";
      }
      if (modo == "crear") {
        usuarioSeleccionado.value = {};
        stateUser.showModal = true;
        titleModal.value = "Crear usuario";
      }
    };
    const cerrarModal = () => {
      stateUser.showModal = false;
    };

    const changeDondeVive = (event) => {
      buscarCiudad(event.query);
    };

    const updateUser = () => {
      actualizarUsuario(usuarioSeleccionado.value);
    };

    return {
      dt,
      obtenerUsuarios,
      stateUser,
      loading,
      onInput,
      abrirModal,
      showModal,
      titleModal,
      cerrarModal,
      usuarioSeleccionado,
      stateUbication,
      modoModal,
      actualizarUsuario,
      updateUser,
      changeDondeVive,
      obtenerLocacionesPorCiudad,
      stateLocation,
    };
  },
};
</script>

<style></style>
