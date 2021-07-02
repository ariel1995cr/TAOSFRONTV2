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
    <div class="p-col-12 p-lg-6">
      <Chart type="pie" :options="optionsActos" :data="chartDataActos" ref="chartRefDataActos" />
    </div>
    <div class="p-col-12 p-lg-6">
    <Chart type="pie" :options="optionsData" :data="chartData" ref="chartRef" />
    </div>
    <div class="p-col-12 p-lg-6">
      <Chart type="line" :options="optionsData2" :data="chartData2" ref="chartRef2" />
    </div>
    <div class="p-col-12 p-lg-6">
      <Chart type="line" :options="optionsData2" :data="chartDataCards" ref="chartRefDataCards" />
    </div>
    <div class="p-col-12 p-lg-6">
      <Chart type="bar" :options="optionsDataRDP" :data="chartDataRDP" ref="chartRefDataRDP" />
    </div>
    <div class="p-col-12 p-lg-6">
      <Chart type="bar" :options="optionsData3" :data="chartDataEPP" ref="chartRefDataEPP" />
    </div>
    <div class="p-col-12 p-lg-6">
      <Chart type="bar" :options="optionsData3" :data="chartDataHYE" ref="chartRefDataHYE" />
    </div>
    <div class="p-col-12 p-lg-6">
      <Chart type="bar" :options="optionsData3" :data="chartDataPOL" ref="chartRefDataPOL" />
    </div>
    <div class="p-col-12 p-lg-6">
      <Chart type="bar" :options="optionsData3" :data="chartDataPP" ref="chartRefDataPP" />
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import CounterStats from "../../components/CounterStats.vue";
import DashboardService from "../../services/DashboardService";
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import Chart from "primevue/chart";
import ChartJsPluginDataLabels from "chartjs-plugin-labels";
export default {
  components: {
    CounterStats,
    Vue3ChartJs,
    Chart,
    ChartJsPluginDataLabels,
  },
  setup() {
    const colores = ["#0055E5E","#B22F66", "#00CBCB", "#FF531F", "#FFB02F"];
    const { ObtenerEstaditica, ObtenerEstaditica2, state } = DashboardService();
    const chartRef = ref(null);
    const chartRef2 = ref(null);
    const chartRefDataRDP = ref(null);
    const chartRefDataEPP = ref(null);
    const chartRefDataHYE = ref(null);
    const chartRefDataPOL = ref(null);
    const chartRefDataPP = ref(null);
    const chartRefDataCards = ref(null);
    const chartRefDataActos = ref(null);


    const optionsData = ref({
      responsive: true,
      title:{
        display: true,
        text: "Estadisticas por categorias",
      },
      plugins:{
        labels:{
          render: 'percentage',
          fontColor: '#FFF',
          fontSize: 18,
          showActualPercentages: true,
        },
      }
    });

    const optionsActos = ref({
      responsive: true,
      title:{
        display: true,
        text: "Estadisticas por categorias",
      },
      plugins:{
        labels:{
          render: 'percentage',
          fontColor: '#FFF',
          fontSize: 18,
          showActualPercentages: true,
        },
      }
    });

    const optionsData2 = ref({
      responsive: true,
      scales:{
        xAxes:[{
          display: true,
          offset: true,
          ticks:{
            autoSkip: false,
            maxRotation: 10,
          }}]
      },
      title:{
        display: true,
        text: "Estadisticas por categorias",
      },
    });

    const optionsData3 = ref({
      responsive: true,
      scales:{
        xAxes:[{
          display: true,
          offset: true,
          ticks:{
            autoSkip: false,
            maxRotation: 10,
          }}],
      },
      title:{
        display: true,
        text: "Estadisticas por categorias",
      },
      plugins:{
        labels:{
          render: 'percentage',
          fontColor: '#FFF',
          fontSize: 18,
          showActualPercentages: true,
        },
      }
    });

    const chartDataCards = ref({
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: colores,
          hoverBackgroundColor: colores,
        }
      ]
    });

    const chartDataActos = ref({
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: colores,
          hoverBackgroundColor: colores,
        }
      ]
    });


    const chartData = ref({
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: colores,
          hoverBackgroundColor: colores,
        }
      ]
    });

    const chartData2 = ref({
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: colores,
          hoverBackgroundColor: colores,
        }
      ]
    });

    const optionsDataRDP = ref({
      responsive: true,
      scales:{
        xAxes:[{
          display: true,
          offset: true,
          ticks:{
            autoSkip: false,
            maxRotation: 20,
            fontSize: 10,
          }}],
      },
      title:{
        display: true,
        text: "Estadisticas por categorias",
      },
      plugins:{
        labels:{
          render: 'percentage',
          fontColor: '#000',
          fontSize: 18,
          showActualPercentages: true,
        },
      }
    });


    const chartDataRDP = ref({
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: colores,
          hoverBackgroundColor: colores,
        }
      ]
    });

    const chartDataEPP = ref({
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: colores,
          hoverBackgroundColor: colores,
        }
      ]
    });

    const chartDataHYE = ref({
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: colores,
          hoverBackgroundColor: colores,
        }
      ]
    });

    const chartDataPOL = ref({
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: colores,
          hoverBackgroundColor: colores,
        }
      ]
    });

    const chartDataPP = ref({
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: colores,
          hoverBackgroundColor: colores,
        }
      ]
    });

    onMounted(async () => {
      await ObtenerEstaditica();
    });

    onBeforeMount(async () => {
      let response = await ObtenerEstaditica2();
      chartData.value.labels = response.dataCategorias.labels;
      chartData.value.datasets[0].data = response.dataCategorias.value;

      chartData2.value.labels = response.dataCategorias.labels;
      chartData2.value.datasets[0].data = response.dataCategorias.value;
      chartData2.value.datasets[0].label = 'Estadistica por categoria'
      chartData2.value.datasets[0].fill = false
      chartData2.value.datasets[0].borderColor = '#0055E5E'


      chartDataRDP.value.labels = response.dataReaccionesDePersonas.labels;
      chartDataRDP.value.datasets[0].data = response.dataReaccionesDePersonas.value;
      chartDataRDP.value.datasets[0].label = 'Reacciones de personas';

      chartDataEPP.value.labels = response.dataEpp.labels;
      chartDataEPP.value.datasets[0].data = response.dataEpp.value;
      chartDataEPP.value.datasets[0].label = 'EQUIPO DE PROTECCION PERSONAL';

      chartDataHYE.value.labels = response.dataHerryEquip.labels;
      chartDataHYE.value.datasets[0].data = response.dataHerryEquip.value;
      chartDataHYE.value.datasets[0].label = 'Herramientas y Equipo';


      chartDataPOL.value.labels = response.dataPOL.labels;
      chartDataPOL.value.datasets[0].data = response.dataPOL.value;
      chartDataPOL.value.datasets[0].label = 'PROCEDIMIENTOS, ORDEN Y LIMPIEZA';

      chartDataPP.value.labels = response.dataPOL.labels;
      chartDataPP.value.datasets[0].data = response.dataPOL.value;
      chartDataPP.value.datasets[0].label = 'POSICIONES DE LAS PERSONAS';

      chartDataCards.value.labels = response.Cards.labels;
      chartDataCards.value.datasets[0].data = response.Cards.value;
      chartDataCards.value.datasets[0].label = 'Estadistica cards mensuales'
      chartDataCards.value.datasets[0].fill = false
      chartDataCards.value.datasets[0].borderColor = '#0055E5E'


      chartDataActos.value.labels = response.Actos.labels;
      chartDataActos.value.datasets[0].data = response.Actos.value;


      chartRef.value.refresh();
      chartRef2.value.refresh();
      chartRefDataCards.value.refresh();
      chartRefDataRDP.value.refresh();
      chartRefDataEPP.value.refresh();
      chartRefDataHYE.value.refresh();
      chartRefDataPOL.value.refresh();
      chartRefDataPP.value.refresh();
      chartRefDataActos.value.refresh();
    });

    return {
      state,
      chartData,
      chartData2,
      chartRef,
      chartRef2,
      optionsData,
      optionsData2,
      optionsDataRDP,
      chartDataRDP,
      chartDataEPP,
      chartRefDataEPP,
      optionsData3,
      chartDataHYE,
      chartRefDataHYE,
      chartRefDataPOL,
      chartDataPOL,
      chartRefDataPP,
      chartDataPP,
      chartRefDataRDP,
      chartDataCards,
      chartRefDataCards,
      optionsActos,
      chartDataActos,
      chartRefDataActos
    };
  },
};
</script>

<style></style>

