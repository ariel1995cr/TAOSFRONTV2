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

    return {
      state,
      chartClasificacion,
      refClasificacion,
      refTarjetasAnual,
      chartTarjetasAnual,
      optionsPercentaje,
      refRankingUsuarios
    };
  },
};
</script>

<style></style>

