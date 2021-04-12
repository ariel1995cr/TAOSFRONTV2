<template>
  <div v-if="loading">
    Cargando...
    <ProgressSpinner />
  </div>
  <div v-else>
    <div class="p-grid">
      <div class="p-col-12 p-lg-4">
        <div class="p-col-12">
          <span class="p-text-bold">Numero de tarjeta:</span> {{ tarjeta.id }}
          <br />
          <span class="p-text-bold">Creada por:</span> {{ tarjeta.fullName }}
          <br />
          <span class="p-text-bold">En la fecha:</span> {{ tarjeta.created_at }}
          <br />
          <span class="p-text-bold">Estado actual:</span>
          {{ tarjeta.type_state_id }}
          <Button
            label="Cambiar Estado"
            class="p-button-outlined p-col-12 p-mt-2"
            @click="cambiarEstadoTarjeta"
          />
        </div>
        <div class="p-col-12">
          <div
            class="p-col-12 header"
            v-for="categorias in tarjeta.categorias"
            :key="categorias.id"
          >
            {{ categorias.name }}
            <div
              class="items"
              v-for="item in categorias.item"
              :key="item.descripcion"
            >
              <span class="p-text-bold">{{ item.descripcion }}:</span>
              {{ item.value }}
            </div>
          </div>
        </div>
      </div>
      <div class="p-col-12 p-lg-4">
        <GoogleMap
          ref="mapRef"
          id="map"
          class="map"
          api-key="AIzaSyBxvS42el_I328QCEwig5Vx1Lj8gVBXT4Q"
          style="width: 100%; height: 250px"
          :mapTypeControl="false"
          :center="center"
          :zoom="8"
        >
          <Marker :options="markerOptions" />
        </GoogleMap>
        <div class="p-col-12">
          <span class="p-text-bold">Calificar Tarjeta</span>
          <Rating v-model="score" @change="darPuntaje" />
        </div>
        <div class="p-col-12" v-if="score">
          <span class="p-text-bold">Tu puntuación dada es: </span>{{ score }}
        </div>
        <div class="p-col-12">
          <span class="p-text-bold">Listado de Responsables</span>
          <ul>
            <li
              v-for="(responsable, idx) in stateResponsable.responsables"
              v-bind:key="idx"
            >
              {{ responsable.fullName }}
              <i
                class="pi pi-times"
                v-tooltip="'Eliminar responsable'"
                @click="eliminarResponsable(tarjeta.id, responsable.id)"
              ></i>
            </li>
          </ul>
          <span v-if="stateResponsable.responsables.length == 0">
            No hay responsables asignados.
          </span>
        </div>
      </div>
      <div class="p-col-12 p-lg-4">
        <div class="p-col-12 p-jc-center">
          <Button
            label="Agregar Responsable"
            class="p-button-outlined"
            @click="openModalResponsable"
          />
        </div>
        <div class="p-col-12 p-justify-center">
          <ScrollPanel
            class="p-text-left p-px-1"
            style="width: 100%; height: 300px; border: 1px solid #0388e5; border-radius: 5px; background-color:white"
          >
            <p
              style="fontSize: 13px"
              v-for="comentario in chat"
              :key="comentario.id"
            >
              Enviado {{ comentario.created_at }}
              <br />
              Mensaje de
              <span class="p-text-capitalize">
                {{ comentario.fullName }}
              </span>
              <br />
              <span class="w-100" v-if="comentario.is_image">
                <img
                  class="image"
                  :src="'data:image/jpeg;base64,' + comentario.comentario"
                />
                <hr />
              </span>
              <span class="p-text-bold" v-else>
                {{ comentario.comentario }}
                <hr />
              </span>
            </p>
          </ScrollPanel>
        </div>
        <div class="p-col-12" v-if="tarjeta.type_state_id == 'Abierto'">
          <Textarea
            class="p-col-12"
            v-model.trim="nuevoComentario.comentario"
            :autoResize="true"
          />
          <Button
            label="Agregar comentario"
            class="p-button-outlined p-col-12 p-mt-2"
            @click="agregarComentario"
          />
        </div>
      </div>
    </div>
    <Dialog
      header="Agregar Responsable"
      v-model:visible="displayModalResponsable"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <div class="p-grid">
        <div class="p-col-12">
          <MultiSelect
            v-model="nuevosResponsables"
            :options="responsablesDisponibles"
            optionLabel="fullName"
            placeholder="Seleccionar Responsables"
            emptyMessage="No se encontraron resultados"
            :filter="true"
            :filterFields="['fullName', 'dni', 'employeeNumber']"
            class="multiselect-custom"
            style="width: 100% !important"
          >
            <template #value="slotProps">
              <span
                class="itemValue"
                v-for="option of slotProps.value"
                :key="option.id"
              >
                {{ option.fullName }}
              </span>
              <template v-if="!slotProps.value || slotProps.value.length === 0">
                Seleccionar Responsables
              </template>
            </template>
            <template #option="slotProps">
              <div class="country-item">
                <div>
                  {{ slotProps.option.fullName }} - {{ slotProps.option.dni }}
                </div>
              </div>
            </template>
          </MultiSelect>
        </div>
      </div>
      <template #footer>
        <Button
          label="Cerrar"
          icon="pi pi-times"
          @click="closeModalResponsable"
          class="p-button-text"
        />
        <Button
          label="Guardar"
          @click="saveResponsables"
          icon="pi pi-check"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import TarjetasService from "../../services/TarjetasService";
import ComentariosService from "../../services/ComentariosService";
import ScoreService from "../../services/ScoreService";
import UserService from "../../services/UserService";
import ResponsableService from "../../services/ResponsableService";
import { useRoute } from "vue-router";
import Rating from "primevue/rating";
import { GoogleMap, Marker } from "vue3-google-map";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import ScrollPanel from "primevue/scrollpanel";
import { useToast } from "primevue/usetoast";
import Dialog from "primevue/dialog";
import MultiSelect from "primevue/multiselect";

export default {
  components: {
    ProgressSpinner,
    Rating,
    GoogleMap,
    Marker,
    Button,
    Textarea,
    ScrollPanel,
    Dialog,
    MultiSelect,
  },
  setup() {
    const { obtenerTarjeta, cambiarEstado } = TarjetasService();
    const { obtenerPuntajeDado, puntarCard } = ScoreService();
    const { obtenerComentarios, agregarComentarios } = ComentariosService();
    const { ObtenerListadoResponsables } = UserService();
    const {
      ObtenerResponsables,
      eliminarResponsable,
      AgregarResponsable,
      state: stateResponsable,
    } = ResponsableService();
    const loading = ref(false);
    const route = useRoute();
    const toast = useToast();
    const addToast = (type, summary, detail) => {
      toast.add({
        severity: type,
        summary: summary,
        detail: detail,
        life: 3000,
      });
    };
    const mapRef = ref(null);
    const center = { lat: -45.86413, lng: -67.49656 };
    const markerOptions = {
      position: { lat: null, lng: null },
      label: "",
      title: "",
    };

    let tarjeta = ref({});
    let score = ref(null);
    let chat = ref(null);
    let nuevoComentario = reactive({
      comentario: "",
    });
    let displayModalResponsable = ref(false);
    let responsablesDisponibles = ref([]);
    let nuevosResponsables = ref(null);
    let responsablesAsignados = ref([]);

    const obtenerScore = async (cardId) => {
      let response = await obtenerPuntajeDado(cardId);
      score.value = response.score;
    };

    const obtenerChat = async (cardId) => {
      let response = await obtenerComentarios(cardId);
      chat.value = response;
    };

    const darPuntaje = async (event) => {
      let response = await puntarCard(tarjeta.value.id, event.value);
      if (response.status == 200) {
        addToast(
          "success",
          "Calificacion otorgada.",
          "Su calificación fue dada con éxito."
        );
      }
      if (response.status == 404) {
        addToast("error", "Comentario no enviado.", response.data.msg);
      }
      await obtenerScore(tarjeta.value.id);
    };

    const agregarComentario = async () => {
      let response = await agregarComentarios(
        tarjeta.value.id,
        nuevoComentario.comentario
      );
      if (response.status == 200) {
        addToast(
          "success",
          "Comentario enviado.",
          "El comentario se envio de manera exitosa."
        );
        nuevoComentario.comentario = "";
        await obtenerChat(route.params.id);
      } else {
        addToast("error", "Comentario no enviado.", response.data.msg);
      }
    };

    const closeModalResponsable = () => {
      nuevosResponsables.value = null;
      displayModalResponsable.value = false;
    };
    const openModalResponsable = () => {
      displayModalResponsable.value = true;
    };

    const cambiarEstadoTarjeta = async () => {
      let response = await cambiarEstado(tarjeta.value.id);
      if (response.status == 404) {
        addToast("error", "Error.", response.data.msg);
      }
      if (response.status == 200) {
        await addToast(
          "success",
          "Estado cambiado correctamente.",
          response.data.msg
        );
        response = await obtenerTarjeta(tarjeta.value.id);
        tarjeta.value = response;
      }
    };

    const saveResponsables = async () => {
      let response = await AgregarResponsable(
        tarjeta.value.id,
        nuevosResponsables
      );

      if (stateResponsable.response.status == 422) {
        addToast(
          "error",
          "Error de validación.",
          stateResponsable.response.data.responsables[0]
        );
      }
      if (stateResponsable.response.status == 404) {
        addToast(
          "error",
          "Error de validación.",
          stateResponsable.response.data.msg
        );
      }
      if (stateResponsable.response.status == 200) {
        addToast(
          "success",
          "Responsable agregado correctamente.",
          stateResponsable.response.data.msg
        );
        closeModalResponsable();
      }
    };

    onMounted(async () => {
      loading.value = true;
      let response = await obtenerTarjeta(route.params.id);
      if (response.latitud != null && response.longitud != null) {
        markerOptions.position.lat = Number(response.latitud);
        markerOptions.position.lng = Number(response.longitud);
        center.lat = Number(response.latitud);
        center.lng = Number(response.longitud);
      }
      tarjeta.value = response;
      await obtenerScore(route.params.id);
      await obtenerChat(route.params.id);
      response = await ObtenerListadoResponsables(route.params.id);
      responsablesDisponibles.value = response;
      await ObtenerResponsables(route.params.id);
      loading.value = false;
    });

    return {
      loading,
      tarjeta,
      score,
      darPuntaje,
      center,
      markerOptions,
      chat,
      nuevoComentario,
      agregarComentario,
      toast,
      addToast,
      displayModalResponsable,
      closeModalResponsable,
      openModalResponsable,
      responsablesDisponibles,
      nuevosResponsables,
      saveResponsables,
      responsablesAsignados,
      cambiarEstadoTarjeta,
      mapRef,
      eliminarResponsable,
      stateResponsable,
    };
  },
};
</script>

<style>
.header {
  background-color: #0388e5;
  color: black;
}
.header:first-child {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.header:last-child {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.items {
  background-color: lightskyblue;
  border-left: 2px solid black;
  border-right: 2px solid black;
  padding: 5px;
}
.items:first-child {
  border-top: 2px solid black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.items:last-child {
  border-bottom: 2px solid black;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.itemValue {
  background-color: #0b7ad1;
  text-transform: capitalize;
  color: whitesmoke;
  font-size: 1.2em;
  border-radius: 5px;
  margin: 5px;
  padding: 3px;
}
</style>
