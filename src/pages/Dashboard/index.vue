<template>
  <div class="p-grid p-fluid dashboard">
    <counter-stats
      title="Cantidad de tarjetas"
      detail="Numero total de tarjetas realizadas."
      :count="state.numeroTarjetas"
    />
    <counter-stats
      title="Cantidad de usuarios"
      detail="Numero total de usuarios registrados"
      :count="state.numeroUsuarios"
    />
    -
    <div class="p-col-12 p-md-6">
      <Chart type="pie" :data="chartClasificacion" ref="refClasificacion" :options="optionsPercentaje" />
    </div>
    <div class="p-col-12 p-md-6">
      <Chart type="line" :data="chartTarjetasAnual" ref="refTarjetasAnual" />
    </div>
    <div class="p-col-12 p-md-6">
      <DataTable :rowHover="true" :value="refRankingUsuarios" :scrollable="true" scrollHeight="400px" stripedRows responsiveLayout="scroll">
        <template #header>
          TOP 10 TARJETAS POR USUARIO
        </template>
        <Column field="apellido" header="APELLIDO"></Column>
        <Column field="nombre" header="NOMBRE"></Column>
        <Column field="cantidad" header="CREADAS"></Column>
      </DataTable>
    </div>
    <div class="p-col-12 p-md-6">
      <GMapMap
          :center="center"
          :zoom="7"
          map-type-id="terrain"
          style="width: 500px; height: 10rem"
      >
        <GMapCluster>
          <GMapMarker
              :key="index"
              v-for="(m, index) in state.marcadores"
              :position="{
                lat: Number(m.latitud),
                lng: Number(m.longitud),
              }"
              :clickable="true"
              :draggable="true"
              :zoomOnClick="true"
              @click="center={
                lat: Number(m.latitud),
                long: Number(m.longitud),
              }"
          />
        </GMapCluster>
      </GMapMap>
    </div>
  </div>
</template>



<script>
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import CounterStats from "../../components/CounterStats.vue";
import DashboardService from "../../services/DashboardService";
import Chart from "primevue/chart";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
export default {
  components: {
    CounterStats,
    Chart,
    DataTable,
    Column
  },
  setup() {
    const colores = ["#0055E5E", "#B22F66", "#00CBCB", "#FF531F", "#FFB02F"];
    const {ObtenerEstaditica, ObtenerEstaditica2, state} = DashboardService();

    const chartClasificacion = ref({
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: colores,
          hoverBackgroundColor: colores,
        }
      ]
    });
    const refClasificacion = ref(null);


    const refTarjetasAnual = ref(null);
    const chartTarjetasAnual = ref({});

    const refRankingUsuarios = ref([]);


    const optionsPercentaje = ref({
      plugins: {
        labels: [
          {
            render: 'percentage'
          }
        ]
      }
    });

    onBeforeMount(async () => {
      await ObtenerEstaditica();
      let response = await ObtenerEstaditica2();
      chartClasificacion.value.datasets[0].data = response.clasificacion.datasets.data;
      chartClasificacion.value.labels = response.clasificacion.labels;

      chartTarjetasAnual.value.labels = response.anios.labels;
      chartTarjetasAnual.value.datasets = response.anios.datasets;

      refRankingUsuarios.value = response.users[0];

      await refClasificacion.value.refresh();
      await refTarjetasAnual.value.refresh();
    });

    const center = reactive({lat: -45.7833300, lng: -67.4500000});

    return {
      state,
      chartClasificacion,
      refClasificacion,
      refTarjetasAnual,
      chartTarjetasAnual,
      optionsPercentaje,
      refRankingUsuarios,
      center,
    };
  },
};
</script>

<style>
.vue-map{
  width: 100% !important;
  height: 450px !important;
  min-height: 2rem !important;
}
</style>

