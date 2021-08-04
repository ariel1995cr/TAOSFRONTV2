<template>
  <div v-if="state.loading">
    Cargando...
    <ProgressSpinner />
  </div>
  <div v-else>
    <span class="p-input-icon-left p-mb-2">
      <i class="pi pi-search" />
      <InputText
        :value="$route.query.q"
        v-debounce:1000ms="onInput"
        placeholder="Buscar"
      />
    </span>

    <br />

    <DataTable :value="state.cards.data">
      <template #empty>
        No se encontraron tarjetas que te pertenezcan.
      </template>
      <template #loading>
        Cargando tus tarjetas.
      </template>
      <Column field="created_at" header="FECHA" :sortable="true"></Column>
      <Column field="idCard" header="NUMERO" :sortable="true">
        <template #body="slotProps">
          <router-link :to="'/dashboard/Tarjetas/' + slotProps.data.idCard">{{
            slotProps.data.idCard
          }}</router-link>
        </template>
      </Column>
      <Column field="countryName" header="PAÍS" :sortable="true"></Column>
      <Column field="stateName" header="PROVINCIA" :sortable="true"></Column>
      <Column field="cityName" header="CIUDAD" :sortable="true"></Column>
      <Column field="apellido" header="CREADO POR" :sortable="true">
        <template #body="slotProps">
          {{slotProps.data.apellido}} {{slotProps.data.nombre}}
        </template>
      </Column>
    </DataTable>

    <br />
    <Button
      @click="listadoMisTarjetas(route.query.q, state.cards.prev_page)"
      v-if="state.cards.prev_page"
    >
      Anterior
    </Button>
    <Button
      class="p-ml-2"
      @click="listadoMisTarjetas(route.query.q, state.cards.next_page)"
      v-if="state.cards.next_page"
    >
      Siguiente
    </Button>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import TarjetasService from "../../services/TarjetasService";
import { onMounted, ref, computed } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";
import Checkbox from 'primevue/checkbox';
import { useRouter, useRoute } from "vue-router";
import jwt_decode from "jwt-decode";
export default {
  components: {
    Column,
    DataTable,
    ProgressSpinner,
    InputText,
    Button,
    Checkbox
  },
  setup() {
    const { listadoMisTarjetas, state } = TarjetasService();
    const tarjetas = ref(null);
    const dt = ref(null);

    let soyResponsable = ref(false);

    let loading = ref(true);

    const router = useRouter();
    const route = useRoute();

    const onInput = (val, e) => {
      router.replace({
        query: {
          q: val,
        },
      });
    };

    const listarTarjetas = async () => {
      loading.value = true;
      console.log();
      let resp = await listadoMisTarjetas(route.query.q.length != 0 ? route.query.q : "", state.cards.first_page);
      tarjetas.value = resp;
      loading.value = false;
    };

    onMounted(async () => {
      await listarTarjetas();
    });


    return {
      dt,
      tarjetas,
      loading,
      onInput,
      state,
      route,
      listadoMisTarjetas,
      soyResponsable
    };
  },
};
</script>

<style></style>
