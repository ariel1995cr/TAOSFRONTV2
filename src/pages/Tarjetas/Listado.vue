<template>
  <div>
    <DataTable :value="customers" :lazy="true" :paginator="true" :rows="15" v-model:filters="filters" ref="dt"
               :totalRecords="totalRecords" :loading="loading" @page="onPage($event)" @sort="onSort($event)" @update:filters="onFilter($event)" filterDisplay="row"
               :globalFilterFields="['created_at', 'countryName']" responsiveLayout="scroll">
      <template #header>
        <div style="text-align:left">
          <MultiSelect :modelValue="selectedColumns" :options="columns" optionLabel="header" @update:modelValue="onToggle"
                       placeholder="Select Columns" style="width: 20em"/>
        </div>
      </template>
      <Column field="created_at" header="FECHA" filterField="c.created_at" filterMatchMode="contains" ref="created_at" :sortable="true" v-if="buscarSeleccion('created_at')">
        <template #filter="{filterModel,filterCallback}">
          <Calendar dateFormat="dd/mm/yy" id="calendar" v-model="filterModel.value" @date-select="filterCallback" placeholder="Buscar por fecha" :showIcon="true" />
        </template>
      </Column>
      <Column field="idCard" header="NÚMERO" filterField="c.id" sortField="c.id" filterMatchMode="contains" ref="idCard" :sortable="true" v-if="buscarSeleccion('idCard')">
        <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback" class="p-column-filter" placeholder="Buscar por número"/>
        </template>
        <template #body="slotProps">
          <router-link :to="'/dashboard/Tarjetas/' + slotProps.data.idCard">{{
              slotProps.data.idCard
            }}</router-link>
        </template>
      </Column>
      <Column field="countryName" header="PAÍS" filterField="countries.name" sortField="countries.name" filterMatchMode="contains" ref="countryName" :sortable="true" v-if="buscarSeleccion('countryName')">
        <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Buscar por país"/>
        </template>
      </Column>
      <Column field="stateName" header="PROVINCIA" filterField="states.name" filterMatchMode="contains" ref="stateName" :sortable="true" v-if="buscarSeleccion('stateName')">
        <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Buscar por provincia"/>
        </template>
      </Column>
      <Column field="cityName" header="CIUDAD" filterField="cities.name" filterMatchMode="contains" ref="cityName" :sortable="true"  v-if="buscarSeleccion('cityName')" >
        <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Buscar por ciudad"/>
        </template>
      </Column>
      <Column field="latitud" header="LAT" filterField="latitud" filterMatchMode="contains" :sortable="false" v-if="buscarSeleccion('latitud')">
      </Column>
      <Column field="longitud" header="LONG" filterField="longitud" filterMatchMode="contains" :sortable="false" v-if="buscarSeleccion('longitud')">
      </Column>
      <Column field="type_state_id" header="Estado" filterField="type_state_id" filterMatchMode="contains" :sortable="false" v-if="buscarSeleccion('type_state_id')" >
      </Column>
      <Column field="apellido" header="CREADO POR" filterField="u.fullName" ref="fullName" :sortable="true" v-if="buscarSeleccion('apellido')">
        <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Buscar por nombre"/>
        </template>
        <template #body="slotProps">
          <Avatar :image="slotProps.data.image" shape="circle" v-if="slotProps.data.image"/>
          <Avatar :label="slotProps.data.apellido.charAt(0)+slotProps.data.nombre.charAt(0)" class="p-mr-2" shape="circle" v-else/>
          {{slotProps.data.apellido}} {{slotProps.data.nombre}}
        </template>
      </Column>
      <Column field="responsables" header="Responsables" v-if="buscarSeleccion('responsables')">
        <template #body="slotProps">
          <span v-if="slotProps.data.responsables.length == 0">No hay responsables.</span>
          <AvatarGroup class="p-mb-3">
            <span v-for="responsable in slotProps.data.responsables">
              <Avatar :image="responsable.image" shape="circle" v-if="responsable.image"/>
              <Avatar :label="responsable.apellido.charAt(0)+responsable.nombre.charAt(0)" shape="circle" v-else/>
            </span>
          </AvatarGroup>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import TarjetasService from "../../services/TarjetasService";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Calendar from "primevue/calendar";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";
import MultiSelect from "primevue/multiselect";

export default {
  components:{
    Column,
    DataTable,
    InputText,
    InputMask,
    Calendar,
    Avatar,
    AvatarGroup,
    MultiSelect,
  },
  setup() {
    const { listadoTarjetas, state } = TarjetasService();

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
      {field: 'created_at', header: 'FECHA'},
      {field: 'idCard', header: 'NÚMERO'},
      {field: 'countryName', header: 'PAÍS'},
      {field: 'states.name', header: 'PROVINCIA'},
      {field: 'cityName', header: 'CIUDAD'},
      {field: 'apellido', header: 'CREADO POR'},
      {field: 'responsables', header: 'Responsables'},
      {field: 'latitud', header: 'LAT'},
      {field: 'longitud', header: 'LONG'},
      {field: 'type_state_id', header: 'Estado'},
    ]);


    const loadLazyData = async () => {
      loading.value = true;
      await listadoTarjetas({lazyEvent: JSON.stringify( lazyParams.value )}, state.cards.first_page);
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

    const selectedColumns = ref(columns.value);

    const buscarSeleccion = (data) => {
      let busqueda = selectedColumns.value.findIndex(x => x.field == data)
      return busqueda != -1;
    };

    const onToggle = (val) => {
      selectedColumns.value = columns.value.filter(col => val.includes(col));
    };

    return { buscarSeleccion, selectedColumns ,dt, loading, totalRecords, customers, onToggle, filters, lazyParams, columns, loadLazyData, onPage, onSort, onFilter }
  }
}
</script>