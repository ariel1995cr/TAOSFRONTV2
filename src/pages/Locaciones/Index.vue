<template>
  <ConfirmPopup></ConfirmPopup>
  <DataTable
    :value="stateLocation.locaciones"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    ref="dt"
    :loading="stateLocation.loading"
    currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords}"
  >
    <template #header>
      <div class="p-d-flex p-jc-between p-ai-center">
        <h5 class="p-m-0">Locaciones</h5>
        <Button @click="abrirModal('Nueva locacion', true, null)"
          >Agregar</Button
        >
      </div>
    </template>
    <template #empty>
      No se encontraron locaciones cargadas.
    </template>
    <template #loading>
      Cargando locaciones. Espere por favor.
    </template>
    <Column field="id" header="Nombre" :sortable="true"></Column>
    <Column field="state_id" header="Ciudad" :sortable="true">
      <template #body="slotProps">
        {{ slotProps.data.city.name }}, {{ slotProps.data.city.state.name }},
        {{ slotProps.data.city.state.country.name }}
      </template>
    </Column>
    <Column field="latitud" header="Latitud" :sortable="true"></Column>
    <Column field="longitud" header="Longitud" :sortable="true"></Column>
    <Column header="ACCIONES">
      <template #body="slotProps">
        <Button
            @click="abrirModal('Editar locacion', false, slotProps.data)"
            icon="pi pi-pencil"
            label="Editar"
            class="p-button-secondary p-button-outlined"
            v-if="slotProps.data.deleted_at == null"
        ></Button>
        <Button
          @click="confirmarBorrar($event, slotProps.data)"
          icon="pi pi-times"
          label="Desactivar"
          class="p-button-danger p-button-outlined p-ml-2"
          v-if="slotProps.data.deleted_at == null"
        ></Button>
        <Button
            @click="confirmarActivar($event, slotProps.data)"
            icon="pi pi-check"
            label="Activar"
            class="p-button-success p-button-outlined p-ml-2"
            v-if="slotProps.data.deleted_at"
        ></Button>
      </template>
    </Column>
  </DataTable>
  <Dialog
    :header="stateLocation.titleModal"
    v-model:visible="stateLocation.openModal"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12 p-md-6">
        <label class="p-text-bold">Nombre</label>
        <InputText type="text" v-model="locacion.id" />
        <span style="color: red" v-if="stateLocation.response?.errors?.['id']">
          {{ stateLocation.response?.errors["id"][0] }}
          <br />
        </span>
      </div>
      <div class="p-field p-col-12 p-md-6">
        <label class="p-text-bold">Ciudad</label>
        <Autocomplete
          id="ciudad"
          v-model="locacion.state_id"
          :suggestions="stateCiudades.ciudades"
          @complete="searchCity($event)"
          field="ciudades"
          autocomplete="off"
        />
        <span
          style="color: red"
          v-if="stateLocation.response?.errors?.['state_id.city_id']"
        >
          {{ stateLocation.response?.errors["state_id.city_id"][0] }}
          <br />
        </span>
      </div>
      <div class="p-field p-col-12 p-md-6">
        <label class="p-text-bold">Latitud</label>
        <InputText type="text" v-model="locacion.latitud" />
        <span
          style="color: red"
          v-if="stateLocation.response?.errors?.['latitud']"
        >
          {{ stateLocation.response?.errors["latitud"][0] }}
          <br />
        </span>
      </div>
      <div class="p-field p-col-12 p-md-6">
        <label class="p-text-bold">Longitud</label>
        <InputText type="text" v-model="locacion.longitud" />
        <span
          style="color: red"
          v-if="stateLocation.response?.errors?.['longitud']"
        >
          {{ stateLocation.response?.errors["longitud"][0] }}
          <br />
        </span>
      </div>
      <GoogleMap
        api-key="AIzaSyBxvS42el_I328QCEwig5Vx1Lj8gVBXT4Q"
        style="width: 100%; height: 250px"
        :center="center"
        :zoom="9"
      >
        <Marker
          @dragend="arrastroMarker($event)"
          :options="{
            position: { lat: locacion.latitud, lng: locacion.longitud },
            draggable: true,
          }"
        />
      </GoogleMap>
    </div>
    <template #footer>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        class="p-button-text"
        @click="closeModal"
      />
      <Button @click="guardarlocacion(locacion)" v-if="(!stateLocation.loading) && stateLocation.nuevo"
        >Agregar</Button
      >
      <Button @click="updateLocacion(locacion)" v-if="(!stateLocation.loading) && !(stateLocation.nuevo)"
      >Guardar</Button
      >
    </template>
  </Dialog>
</template>

<script>
import { onMounted, ref } from "vue";
import LocationService from "../../services/LocationService";
import UbicationService from "../../services/UbicationService";
import DataTable from "primevue/datatable";
import Dialog from "primevue/dialog";
import Column from "primevue/column";
import Button from "primevue/button";
import Autocomplete from "primevue/autocomplete";
import { GoogleMap, Marker } from "vue3-google-map";
import InputText from "primevue/inputtext";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import ConfirmPopup from "primevue/confirmpopup";

export default {
  components: {
    DataTable,
    Dialog,
    Column,
    Button,
    Autocomplete,
    GoogleMap,
    Marker,
    InputText,
    ConfirmPopup,
  },
  setup() {
    const {
      obtenerLocaciones,
      state: stateLocation,
      guardarlocacion,
      borrarLocacion,
      updateLocacion,
      activarLocacion,
    } = LocationService();
    const displayModalLocation = ref(false);
    const titleHeader = ref("");
    const { buscarCiudad, state: stateCiudades } = UbicationService();
    const locacion = ref({});
    const coords = ref({
      lat: null,
      lng: null,
    });
    const center = ref({ lat: 40.689247, lng: -74.044502 });
    const confirm = useConfirm();
    const toast = useToast();

    const arrastroMarker = (event) => {
      locacion.value.latitud = event.latLng.lat();
      locacion.value.longitud = event.latLng.lng();
    };

    onMounted(async () => {
      await obtenerLocaciones();
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          coords.value.lat = position.coords.latitude;
          coords.value.lng = position.coords.longitude;
          center.value.lat = Number(position.coords.latitude);
          center.value.lng = Number(position.coords.longitude);
        });
      } else {
        /* la geolocalización NO está disponible */
        console.log("Geolocalizacion no disponible");
      }
    });

    const searchCity = async (event) => {
      await buscarCiudad(event.query);
    };

    const abrirModal = (title, nuevo, location) => {
      location = { ...location };
      stateLocation.titleModal = title;
      stateLocation.openModal = true;
      if (nuevo) {
        stateLocation.nuevo = true;
        locacion.value = {
          id: null,
          state_id: null,
          latitud: Number(coords.value.lat),
          longitud: Number(coords.value.lng),
        };
      }else{
        stateLocation.nuevo = false;
        location.nombre_anterior = location.id;
        let numberCity = location.state_id;
        location.state_id = {};
        location.state_id.city_id = numberCity;
        location.state_id.ciudades = `${location.city.name}, ${location.city.state.name} ,${location.city.state.country.name}`;
        location.latitud = Number(location.latitud);
        location.longitud = Number(location.longitud);
        locacion.value = location;
      }

    };

    const closeModal = () => {
      stateLocation.titleModal = "";
      stateLocation.openModal = false;
      locacion.value = {};
    };

    const confirmarBorrar = (event, data) => {
      confirm.require({
        target: event.currentTarget,
        message: "Esta seguro que quiere desactivar la locación?",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          borrarLocacion(data.id);
        },
        reject: () => {},
      });
    };

    const confirmarActivar = (event, data) => {
      confirm.require({
        target: event.currentTarget,
        message: "Esta seguro que quiere activar la locación?",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          activarLocacion(data.id);
        },
        reject: () => {},
      });
    };

    return {
      obtenerLocaciones,
      stateLocation,
      abrirModal,
      displayModalLocation,
      locacion,
      stateCiudades,
      searchCity,
      coords,
      center,
      arrastroMarker,
      titleHeader,
      closeModal,
      guardarlocacion,
      confirmarBorrar,
      updateLocacion,
      confirmarActivar
    };
  },
};
</script>

<style></style>
