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
      <vue3-chart-js
        ref="chartRef"
        :id="dataCategoria.id"
        :type="dataCategoria.type"
        :data="dataCategoria.data"
        :options="options"
      ></vue3-chart-js>
    </div>
    <div class="p-col-12 p-lg-6">
      <vue3-chart-js
        ref="chartRef2"
        :id="dataCategoria2.id"
        :type="dataCategoria2.type"
        :data="dataCategoria2.data"
        :options="dataCategoria2.options"
        :plugins="dataCategoria2.plugins"
      ></vue3-chart-js>
    </div>
    <div class="p-col-12 p-lg-6">
      <vue3-chart-js
        ref="chartRefReaccionDePersonas"
        :id="dataReaccionesDePersonas.id"
        :type="dataReaccionesDePersonas.type"
        :data="dataReaccionesDePersonas.data"
        :options="dataReaccionesDePersonas.options"
      ></vue3-chart-js>
    </div>
    <div class="p-col-12 p-lg-6">
      <vue3-chart-js
        ref="chartRefEpp"
        :id="dataEpp.id"
        :type="dataEpp.type"
        :data="dataEpp.data"
        :options="dataEpp.options"
      ></vue3-chart-js>
    </div>
    <div class="p-col-12 p-lg-6">
      <vue3-chart-js
        ref="chartRefHerryEquip"
        :id="dataHYE.id"
        :type="dataHYE.type"
        :data="dataHYE.data"
        :options="dataHYE.options"
      ></vue3-chart-js>
    </div>
    <div class="p-col-12 p-lg-6">
      <vue3-chart-js
        ref="chartRefPOL"
        :id="dataPOL.id"
        :type="dataPOL.type"
        :data="dataPOL.data"
        :options="dataPOL.options"
      ></vue3-chart-js>
    </div>
    <div class="p-col-12 p-lg-6">
      <vue3-chart-js
        ref="chartRefPP"
        :id="dataPP.id"
        :type="dataPP.type"
        :data="dataPP.data"
        :options="dataPP.options"
      ></vue3-chart-js>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import CounterStats from "../../components/CounterStats.vue";
import DashboardService from "../../services/DashboardService";
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";

export default {
  components: {
    CounterStats,
    Vue3ChartJs,
  },
  setup() {
    const chartRef = ref(null);
    const chartRef2 = ref(null);
    const chartRefReaccionDePersonas = ref(null);
    const chartRefEpp = ref(null);
    const chartRefHerryEquip = ref(null);
    const chartRefPOL = ref(null);
    const chartRefPP = ref(null);
    const { ObtenerEstaditica, ObtenerEstaditica2, state } = DashboardService();
    let options = {
      title: {
        display: true,
        text: "Estadistica por categorias",
      },
      plugins: {
        labels: {
          render: "percentage",
        },
      },
    };

    let dataCategoria = reactive({
      id: "doughnut",
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#4663e8",
              "#667dec",
              "#8497f0",
              "#a9b7f5",
              "#bac5f8",
            ],
            data: [],
          },
        ],
      },
    });

    let dataCategoria2 = reactive({
      id: "horizontalBar",
      type: "horizontalBar",
      data: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#4663e8",
              "#667dec",
              "#8497f0",
              "#a9b7f5",
              "#bac5f8",
            ],
            data: [],
            label: "",
          },
        ],
      },
      plugins: [
        {
          labels: {
            render: "percentage",
            fontSize: 20,
          },
        },
      ],
      options: {
        title: {
          display: true,
          text: "Estadistica por categorias",
        },
      },
    });

    let dataReaccionesDePersonas = reactive({
      id: "bar",
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#4663e8",
              "#667dec",
              "#8497f0",
              "#a9b7f5",
              "#bac5f8",
            ],
            data: [],
            label: "",
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Reacciones de Personas",
        },
      },
    });

    let dataEpp = reactive({
      id: "barEpp",
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#4663e8",
              "#667dec",
              "#8497f0",
              "#a9b7f5",
              "#bac5f8",
            ],
            data: [],
            label: "",
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "EQUIPO DE PROTECCION PERSONAL",
        },
      },
    });

    let dataHYE = reactive({
      id: "barEpp",
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#4663e8",
              "#667dec",
              "#8497f0",
              "#a9b7f5",
              "#bac5f8",
            ],
            data: [],
            label: "",
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "HERRAMIENTAS Y EQUIPO",
        },
      },
    });

    let dataPOL = reactive({
      id: "barEpp",
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#4663e8",
              "#667dec",
              "#8497f0",
              "#a9b7f5",
              "#bac5f8",
            ],
            data: [],
            label: "",
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "PROCEDIMIENTOS, ORDEN Y LIMPIEZA",
        },
      },
    });

    let dataPP = reactive({
      id: "barEpp",
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#4663e8",
              "#667dec",
              "#8497f0",
              "#a9b7f5",
              "#bac5f8",
            ],
            data: [],
            label: "",
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "POSICIONES DE LAS PERSONAS",
        },
      },
    });

    onMounted(async () => {
      await ObtenerEstaditica();
    });

    onBeforeMount(async () => {
      let response = await ObtenerEstaditica2();
      dataCategoria.data.labels = response.dataCategorias.labels;
      dataCategoria.data.datasets[0].data = response.dataCategorias.value;
      dataCategoria2.data.labels = response.dataCategorias.labels;
      dataCategoria2.data.datasets[0].data = response.dataCategorias.value;
      dataReaccionesDePersonas.data.labels =
        response.dataReaccionesDePersonas.labels;
      dataReaccionesDePersonas.data.datasets[0].data =
        response.dataReaccionesDePersonas.value;
      dataEpp.data.labels = response.dataEpp.labels;
      dataEpp.data.datasets[0].data = response.dataEpp.value;

      dataHYE.data.labels = response.dataHerryEquip.labels;
      dataHYE.data.datasets[0].data = response.dataHerryEquip.value;

      dataPOL.data.labels = response.dataPOL.labels;
      dataPOL.data.datasets[0].data = response.dataPOL.value;

      dataPP.data.labels = response.dataPP.labels;
      dataPP.data.datasets[0].data = response.dataPP.value;

      chartRef.value.update();
      chartRef2.value.update();
      console.log(chartRef2.value);
      chartRefReaccionDePersonas.value.update();
      chartRefEpp.value.update();
      chartRefHerryEquip.value.update();
      chartRefPOL.value.update();
      chartRefPP.value.update();
    });

    return {
      state,
      dataCategoria,
      dataCategoria2,
      dataReaccionesDePersonas,
      dataEpp,
      chartRef,
      chartRef2,
      chartRefReaccionDePersonas,
      chartRefPOL,
      options,
      chartRefEpp,
      chartRefHerryEquip,
      dataHYE,
      dataPOL,
      dataPP,
      chartRefPP,
    };
  },
};
</script>

<style></style>
