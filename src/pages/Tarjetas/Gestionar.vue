<template>
  <div v-if="loading">
    Cargando...
    <ProgressSpinner />
  </div>
  <div class="p-grid p-jc-center p-ai-center vertical-container" v-else>
    <div class="p-col-12 p-lg-10">
      <Toolbar>
        <template #left>
          <Button label="Guardar" icon="pi pi-check" class="p-mr-2" />
        </template>

        <template #right>
          <Button
            label="Agregar grupo"
            icon="pi pi-plus"
            class="p-mr-2 p-button-outlined"
            @click="openModalGrupo"
          />
        </template>
      </Toolbar>
      <div
        class="card"
        v-for="categorias in state.categorias"
        :key="categorias.id"
      >
        <div class="p-col-12 headerCategorias p-text-center">
          <span>{{ categorias.name }}</span>
          <i
            class="pi pi-plus-circle p-ml-2"
            v-tooltip="'Agregar campo'"
            @click="openModalNuevoItem(categorias)"
          ></i>
        </div>
        <div class="borderItems">
          <div
            class="p-grid p-ai-center vertical-container p-px-2"
            v-for="item in categorias.items"
            :key="item.id"
          >
            <div class="p-col-12 p-md-3">
              <span class="p-ml-1">Nombre</span>
              <br />
              <InputText
                style="width: 100%"
                type="text"
                v-model="item.descripcion"
              />
            </div>
            <div class="p-col-12 p-md-2">
              <span class="p-ml-1">Tipo campo</span>
              <br />
              <Dropdown
                style="width: 100%"
                v-model="item.tipo_campo"
                :options="tipoCampos"
                placeholder="Seleccionar tipo de campo"
              />
            </div>
            <div
              class="p-col-12 p-md-2"
              v-if="
                item.tipo_campo == 'checkbox' ||
                  item.tipo_campo == 'radio' ||
                  item.tipo_campo == 'select'
              "
            >
              <span class="p-ml-1">Valores posibles</span>
              <br />
              <Chips style="width: 100%" v-model="item.valores_posibles" />
            </div>
            <div class="p-col-12 p-md-1">
              <span class="p-ml-1">Es requerido</span>
              <br />
              <Checkbox v-model="item.es_requerido" :binary="true" />
            </div>
            <div class="p-col-12 p-md-2">
              <Button
                label="Desactivar"
                @click="eliminarItem(item.id)"
                class="p-button-outlined p-button-danger"
                v-if="item.show"
              />
              <Button
                label="Activar"
                @click="habilitarItem(item.id)"
                class="p-button-outlined p-button-success"
                v-else
              />
            </div>
            <div class="p-col-12">
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog
      header="Agregar grupo"
      v-model:visible="displayModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <div class="p-grid">
        <div class="p-col-12">
          <div class="p-field">
            <label for="nombreGrupo">Nombre del grupo</label>
            <InputText
              id="nombreGrupo"
              type="text"
              v-model.trim="categoria.nombre"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <Button
          label="Cerrar"
          icon="pi pi-times"
          @click="closeModelGrupo"
          class="p-button-text"
        />
        <Button
          label="Guardar"
          icon="pi pi-check"
          @click="saveGrupo"
          autofocus
        />
      </template>
    </Dialog>

    <Dialog
      header="Agregar grupo"
      v-model:visible="displayModalNuevoItem"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <div class="p-grid">
        <div class="p-col-12 p-lg-6">
          <div class="p-field">
            <label>Nombre Item</label>
            <InputText
              id="nombreGrupo"
              :class="{ 'p-invalid': errores.descripcion }"
              type="text"
              v-model.trim="newItem.descripcion"
            />
            <span
              style="color: red"
              v-for="(error, idx) in errores.descripcion"
              :key="idx"
              >{{ error }}</span
            >
          </div>
        </div>
        <div class="p-col-12 p-lg-6">
          <div class="p-field">
            <label>Tipo</label>
            <Dropdown
              :class="{ 'p-invalid': errores.tipo_campo }"
              style="width: 100%"
              v-model="newItem.tipo_campo"
              :options="tipoCampos"
              placeholder="Seleccionar tipo de campo"
            />
            <span
              style="color: red"
              v-for="(error, idx) in errores.tipo_campo"
              :key="idx"
              >{{ error }}</span
            >
          </div>
        </div>
        <div class="p-col-12 p-lg-6">
          <div class="p-field">
            <label>Es requerido</label>
            <br />
            <Checkbox
              :class="{ 'p-invalid': errores.es_requerido }"
              v-model="newItem.es_requerido"
              :binary="true"
            />{{ newItem.es_requerido }}
            <br />
            <span
              style="color: red"
              v-for="(error, idx) in errores.es_requerido"
              :key="idx"
              >{{ error }}</span
            >
          </div>
        </div>
      </div>
      <template #footer>
        <Button
          label="Cerrar"
          icon="pi pi-times"
          @click="closeModalNuevoItem"
          class="p-button-text"
        />
        <Button
          label="Guardar"
          icon="pi pi-check"
          @click="saveItem"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>
<script>
import { onMounted, reactive, ref } from "vue";
import TarjetasService from "../../services/TarjetasService";
import CategoryService from "../../services/CategoryService";
import ItemService from "../../services/ItemService";
import InputText from "primevue/inputtext";
import Divider from "primevue/divider";
import Chips from "primevue/chips";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import ProgressSpinner from "primevue/progressspinner";
import { useToast } from "primevue/usetoast";
import Dialog from "primevue/dialog";

export default {
  components: {
    InputText,
    Divider,
    Chips,
    Dropdown,
    Checkbox,
    Button,
    Toolbar,
    ProgressSpinner,
    Dialog,
  },
  setup() {
    const { ObtenerCategorias, state } = TarjetasService();
    const { desactivarItem, activarItem, agregarItem } = ItemService();
    const { agregarCategoria, allCategoriesWithOutItem } = CategoryService();

    const tipoCampos = ref([
      "checkbox",
      "date",
      "email",
      "file",
      "month",
      "number",
      "radio",
      "tel",
      "text",
      "time",
      "radio",
      "select",
      "textarea",
    ]);
    let displayModal = ref(false);
    let displayModalNuevoItem = ref(false);
    let loading = ref(true);
    let errores = ref([]);

    const toast = useToast();

    let categoria = reactive({
      nombre: "",
    });

    let newItem = reactive({
      descripcion: "",
    });

    let categoriasSeleccionables = ref({});
    const eliminarItem = async (idItem) => {
      let response = await desactivarItem(idItem);
      if (response.status == 200) {
        toast.add({
          severity: "success",
          summary: "Categoria desactivada.",
          detail: "Categoria desactivada correctamente.",
          life: 3000,
        });
        await ObtenerCategorias();
      } else {
        toast.add({
          severity: "error",
          summary: "Error al desactivar Categoria.",
          detail: "Algun dato estuvo mal, intente nuevamente.",
          life: 3000,
        });
      }
    };

    const habilitarItem = async (idItem) => {
      let response = await activarItem(idItem);
      if (response.status == 200) {
        toast.add({
          severity: "success",
          summary: "Categoria activada.",
          detail: "Categoria activada correctamente.",
          life: 3000,
        });
        await ObtenerCategorias();
      } else {
        toast.add({
          severity: "error",
          summary: "Error al activar categoria.",
          detail: "Algun dato estuvo mal, intente nuevamente.",
          life: 3000,
        });
      }
    };

    const openModalGrupo = () => {
      displayModal.value = true;
    };

    const closeModelGrupo = () => {
      displayModal.value = false;
    };

    const openModalNuevoItem = (categoria) => {
      newItem.category_id = categoria.id;
      newItem.es_requerido = false;
      displayModalNuevoItem.value = true;
    };

    const closeModalNuevoItem = () => {
      displayModalNuevoItem.value = false;
    };

    const saveItem = async () => {
      let response = await agregarItem(newItem);
      if (response.status == 422) {
        errores.value = response.data;
        addToast("error", "Error al agregar item.", "Error de validación.");
      }
      if (response.status == 200) {
        errores.value = [];
        addToast(
          "success",
          "Agregado correctamente.",
          "Item agregado correctamente."
        );
        await ObtenerCategorias();
        closeModalNuevoItem();
      }
    };

    const saveGrupo = async () => {
      let response = await agregarCategoria(categoria.nombre);
      if (response.status == 200) {
        addToast(
          "success",
          "Categoria agregada correctamente.",
          response.data.msg
        );
      }
      if (response.status == 404) {
        addToast("error", "Error al agregar categoria.", response.data.msg);
      }
      closeModelGrupo;
      await ObtenerCategorias();
    };

    const addToast = (type, summary, detail) => {
      toast.add({
        severity: type,
        summary: summary,
        detail: detail,
        life: 3000,
      });
    };

    onMounted(async () => {
      loading.value = true;
      await ObtenerCategorias();
      let response = await allCategoriesWithOutItem();
      categoriasSeleccionables.value = response.data;
      loading.value = false;
    });

    return {
      state,
      tipoCampos,
      loading,
      eliminarItem,
      habilitarItem,
      displayModal,
      openModalGrupo,
      closeModelGrupo,
      saveGrupo,
      categoria,
      newItem,
      categoriasSeleccionables,
      displayModalNuevoItem,
      openModalNuevoItem,
      closeModalNuevoItem,
      saveItem,
      errores,
    };
  },
};
</script>
<style>
.headerCategorias {
  background-color: lightgrey;
  margin-bottom: 0px;
  border-bottom: 2px solid skyblue;
}
.borderItems {
  border-bottom: 2px solid lightgrey;
  border-left: 2px solid lightgrey;
  border-right: 2px solid lightgrey;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}
.p-inputtext {
  width: 100% !important;
}

.p-dialog .p-dialog-content {
  overflow-y: visible !important;
}
.p-dialog-mask {
  position: absolute;
  pointer-events: auto; /* (optional, doesn't cover whole area when scroll presents) */
}
</style>
