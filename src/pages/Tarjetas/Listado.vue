<template>
  <div v-if="loading">
    Cargando...
    <ProgressSpinner />
  </div>
  <DataTable
    :value="tarjetas"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    ref="dt"
    :loading="loading"
    currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords}"
    v-else
  >
    <template #header>
      <div class="p-d-flex p-jc-between p-ai-center">
        <h5 class="p-m-0">Tarjetas</h5>
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
      No se encontraron tarjetas cargadas.
    </template>
    <template #loading>
      Cargando tarjetas. Espere por favor.
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
    <Column field="fullName" header="CREADO POR" :sortable="true"></Column>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import TarjetasService from "../../services/TarjetasService";
import { onMounted, ref } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import { useRouter, useRoute } from "vue-router";
export default {
  components: {
    Column,
    DataTable,
    ProgressSpinner,
    InputText,
  },
  setup() {
    const { listadoTarjetas } = TarjetasService();
    const tarjetas = ref(null);
    const dt = ref(null);

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
      let resp = await listadoTarjetas(route.query.q);
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
    };
  },
};
</script>

<style></style>
