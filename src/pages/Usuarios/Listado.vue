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
      field="fullName"
      header="NOMBRE Y APELLIDO"
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
    v-model:visible="showModal"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <div class="p-grid">
      <div class="p-field p-col-12 p-lg-6">
        <label for="nombreCompleto">Nombre completo</label>
        <InputText
          v-model.trim="usuarioSeleccionado.fullName"
          id="nombreCompleto"
          type="text"
        />
      </div>
      <div class="p-field p-col-12 p-lg-6">
        <label for="DNI">DNI</label>
        <InputText
          v-model.trim="usuarioSeleccionado.dni"
          id="DNI"
          type="text"
        />
      </div>
      <div class="p-field p-col-12 p-lg-6">
        <label for="numeroEmpleado">Numero de empleado</label>
        <InputText
          v-model.trim="usuarioSeleccionado.employeeNumber"
          id="numeroEmpleado"
          type="text"
        />
      </div>
      <div class="p-field p-col-12 p-lg-6">
        <label for="email">Email</label>
        <InputText
          v-model.trim="usuarioSeleccionado.email"
          id="email"
          type="text"
        />
      </div>
      <div class="p-field p-col-12 p-lg-6">
        <label for="ciudadTrabajo">Trabaja en la ciudad</label>
        <CascadeSelect
          v-model="usuarioSeleccionado.city"
          :options="stateUbication.ciudades"
          optionLabel="name"
          optionGroupLabel="name"
          :optionGroupChildren="['provincias', 'ciudades']"
          style="minWidth: 100%"
        />
      </div>
      <div class="p-field p-col-12 p-lg-6">
        <label for="rol">Rol</label>
        <Dropdown
          v-model="usuarioSeleccionado.rol"
          :options="stateUser.roles"
          optionLabel="nombre"
          placeholder="Seleccionar Rol"
          style="width: 100%"
        />
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
import DataTable from "primevue/datatable";
import Dialog from "primevue/dialog";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import CascadeSelect from "primevue/cascadeselect";
import UserService from "../../services/UserService";
import UbicationService from "../../services/UbicationService";
import { onMounted, ref } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import Dropdown from "primevue/dropdown";
import { useRouter, useRoute } from "vue-router";
export default {
  components: {
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
    } = UbicationService();
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
      stateUser.loading = false;
    });

    const abrirModal = (modo, user) => {
      modoModal.value = modo;
      if (modo == "editar") {
        usuarioSeleccionado.value = { ...user };
        let { country, state, ...city } = user.city;
        usuarioSeleccionado.value.city = city;
        showModal.value = true;
        titleModal.value = "Editar Usuario";
      }
      if (modo == "crear") {
        usuarioSeleccionado.value = {};
        showModal.value = true;
        titleModal.value = "Crear usuario";
      }
    };
    const cerrarModal = () => {
      showModal.value = false;
    };

    const updateUser = () => {
      actualizarUsuario(usuarioSeleccionado.value);
      cerrarModal("");
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
    };
  },
};
</script>

<style></style>
