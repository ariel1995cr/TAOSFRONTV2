<template>
  <div>
    <DataTable :value="customers" :lazy="true" :paginator="true" :rows="15" v-model:filters="filters" ref="dt"
               :totalRecords="totalRecords" :loading="loading" @page="onPage($event)" @sort="onSort($event)" @update:filters="onFilter($event)" filterDisplay="row"
               :globalFilterFields="['created_at', 'countryName']" responsiveLayout="scroll">
      <Column field="created_at" header="FECHA" filterField="c.created_at" filterMatchMode="contains" ref="created_at" :sortable="true">
        <template #filter="{filterModel,filterCallback}">
          <Calendar dateFormat="dd/mm/yy" id="calendar" v-model="filterModel.value" @date-select="filterCallback" placeholder="Buscar por fecha" :showIcon="true" />
        </template>
      </Column>
      <Column field="idCard" header="NÚMERO" filterField="c.id" sortField="c.id" filterMatchMode="contains" ref="idCard" :sortable="true">
        <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback" class="p-column-filter" placeholder="Buscar por número"/>
        </template>
        <template #body="slotProps">
          <router-link :to="'/dashboard/Tarjetas/' + slotProps.data.idCard">{{
              slotProps.data.idCard
            }}</router-link>
        </template>
      </Column>
      <Column field="countryName" header="PAÍS" filterField="countries.name" sortField="countries.name" filterMatchMode="contains" ref="countryName" :sortable="true">
        <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Buscar por país"/>
        </template>
      </Column>
      <Column field="stateName" header="PROVINCIA" filterField="states.name" filterMatchMode="contains" ref="stateName" :sortable="true">
        <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Buscar por provincia"/>
        </template>
      </Column>
      <Column field="cityName" header="CIUDAD" filterField="cities.name" filterMatchMode="contains" ref="cityName" :sortable="true" >
        <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Buscar por ciudad"/>
        </template>
      </Column>
      <Column field="apellido" header="CREADO POR" filterField="u.fullName" ref="fullName" :sortable="true">
        <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Buscar por nombre"/>
        </template>
        <template #body="slotProps">
          {{slotProps.data.apellido}} {{slotProps.data.nombre}}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import TarjetasService from "../../services/TarjetasService";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Calendar from "primevue/calendar";
export default {
  components:{
    Column,
    DataTable,
    InputText,
    InputMask,
    Calendar,
  },
  setup() {
    const { listadoMisAsignaciones, state } = TarjetasService();

    onMounted(() => {
      loading.value = true;

      lazyParams.value = {
        first: 0,
        rows: dt.value.rows,
        sortField: null,
        sortOrder: null,
        filters: filters.value
      };

      loadLazyData();
    })

    const dt = ref();
    const loading = ref(false);
    const totalRecords = ref(0);
    const customers = ref();
    const filters = ref({
      'c.created_at': {value: '', matchMode: 'contains'},
      'c.id': {value: '', matchMode: 'contains'},
      'countries.name': {value: '', matchMode: 'contains'},
      'states.name': {value: '', matchMode: 'contains'},
      'cities.name': {value: '', matchMode: 'contains'},
      'u.fullName': {value: '', matchMode: 'contains'},
    });
    const lazyParams = ref({});
    const columns = ref([
      {field: 'created_at', header: 'Name'},
      {field: 'idCard', header: 'Country'},
      {field: 'countryName', header: 'Company'},
      {field: 'stateName', header: 'Representative'},
      {field: 'cityName', header: 'Representative'},
      {field: 'fullName', header: 'Representative'}
    ]);


    const loadLazyData = async () => {
      loading.value = true;
      await listadoMisAsignaciones({lazyEvent: JSON.stringify( lazyParams.value )}, state.cards.first_page);
      customers.value = state.cards.data;
      console.log(state.cards);
      totalRecords.value  = state.cards.total;
      loading.value = false;
    };
    const onPage = (event) => {
      lazyParams.value = event;
      loadLazyData();
    };
    const onSort = (event) => {
      lazyParams.value = event;
      loadLazyData();
    };
    const onFilter = () => {
     lazyParams.value.filters = filters.value ;
      loadLazyData();
    }

    return { dt, loading, totalRecords, customers, filters, lazyParams, columns, loadLazyData, onPage, onSort, onFilter }
  }
}
</script>