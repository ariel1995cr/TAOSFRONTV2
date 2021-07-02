<template>
  <div class="p-grid">
    <div class="p-col-12">
      <img height="250" width="250" :src="imagenPreview"  v-if="imagenPreview"/>
      <br>
      <input type="file" id="imagen" @change="manejoImagen"/>
    </div>
    <div
      class="p-col-12 p-lg-5 p-m-1 categoria"
      v-for="categorias in state.categorias"
      :key="categorias.id"
    >
      <div class="p-text-bold">{{ categorias.name }}</div>
      <hr class="hr1" />
      <div class="item p-mt-1" v-for="item in categorias.items" :key="item.id">
        <div v-if="item.tipo_campo == 'checkbox'">
          <span class="requerido" v-if="item.es_requerido">*</span
          >{{ item.descripcion }}
          <SelectButton v-model="item.model" :options="item.valores_posibles" />
        </div>
        <div v-if="item.tipo_campo == 'radio'">
          <span class="requerido" v-if="item.es_requerido">*</span
          >{{ item.descripcion }}
          <div v-for="(valor, idx) in item.valores_posibles" :key="idx">
            <RadioButton
              :name="item.descripcion"
              :value="valor"
              v-model="item.model"
            />
            {{ valor }}
          </div>
        </div>
        <div v-if="item.tipo_campo == 'textarea'">
          <span class="requerido" v-if="item.es_requerido">*</span
          >{{ item.descripcion }}
          <Textarea v-model="item.model" rows="5" cols="30" />
        </div>
        <div v-if="item.tipo_campo == 'select'">
          <span class="requerido" v-if="item.es_requerido">*</span
          >{{ item.descripcion }}
          <br />
          <Dropdown
            style="width: 100%"
            v-model="item.model"
            :options="item.valores_posibles"
            placeholder="Seleccionar"
          />
        </div>
        <div v-if="item.tipo_campo == 'file'">
          <span class="requerido" v-if="item.es_requerido">*</span
          >{{ item.descripcion }}
          <br />
          <InputText
            @change="onFilePicked(item)"
            :type="item.tipo_campo"
            v-model="item.model"
          />
          <br />
          <img
            v-if="item.image"
            :src="item.image"
            alt=""
            style="max-width: 100%; width: 250px; object-fit: cover"
          />
        </div>

        <div
          v-if="
            [
              'date',
              'email',
              'month',
              'number',
              'password',
              'tel',
              'text',
              'time',
            ].indexOf(item.tipo_campo) > -1
          "
        >
          <span class="requerido" v-if="item.es_requerido">*</span
          >{{ item.descripcion }}
          <br />
          <InputText :type="item.tipo_campo" v-model="item.model" />
        </div>
      </div>
    </div>
    <div class="p-col-12"><span class="requerido">*</span>Campo requerido</div>
    <div class="p-col-12">
      <Button
        label="Agregar Tarjeta"
        @click="enviarTarjeta"
        class="p-button-outlined p-button-secondary"
      />
    </div>
    <Toast />
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import TarjetasService from "../../services/TarjetasService";
import Checkbox from "primevue/checkbox";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import SelectButton from "primevue/selectbutton";
import InputText from "primevue/inputtext";
import RadioButton from "primevue/radiobutton";
import { useToast } from "primevue/usetoast";
import { defineComponent } from "vue";
import Toast from "primevue/toast";
import router from "../../router/index";
export default defineComponent({
  components: {
    Checkbox,
    Textarea,
    Dropdown,
    Button,
    Toast,
    SelectButton,
    InputText,
    RadioButton,
  },
  setup() {
    let loading = ref(true);
    const { ObtenerCategorias, guardarTarjeta, state } = TarjetasService();
    const toast = useToast();
    let coords = reactive({
      latitud: null,
      longitud: null,
    });

    let imagen = reactive(null);
    let imagenPreview = ref("");

    const onFilePicked = async (item) => {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        item.nombreImagen = file.name;
        const reader = new FileReader();
        reader.onload = async function(e) {
          item.image = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        item.image = null;
      }
    };

    const manejoImagen = async (event) =>{
      imagen = event.target.files;
      if(imagen && imagen[0]){
        let reader = new FileReader();
        reader.onload = e =>{
          imagenPreview.value = e.target.result;
        }
        reader.readAsDataURL(imagen[0]);
      }else{
        imagenPreview.value = null;
        imagen = null;
      }
    }

    onMounted(async () => {
      loading.value = true;
      await ObtenerCategorias();
      loading.value = false;

      console.log(router);

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          coords.latitud = position.coords.latitude;
          coords.longitud = position.coords.longitude;
        });
      } else {
        /* la geolocalización NO está disponible */
        console.log("Geolocalizacion no disponible");
      }
    });

    const enviarTarjeta = async () => {
      let error = false;
      state.categorias.forEach((element) => {
        element.items.forEach((items) => {
          if (items.es_requerido == true) {
            if (!items.hasOwnProperty("model")) {
              error = true;
            }
          }
        });
      });

      if (error) {
        toast.add({
          severity: "error",
          summary: "Error de validación",
          detail: "Debe completar todos los campos requeridos.",
          life: 3000,
        });
        return;
      }

      let response = await guardarTarjeta(state, coords, imagen);
      if (response.status == 200) {
        router.push({ name: "Dashboard.index" });
        toast.add({
          severity: "success",
          summary: "Tarjeta creada.",
          detail: "La tarjeta se ha creado correctamente",
          life: 3000,
        });
      } else {
      }
    };

    return {
      state,
      loading,
      guardarTarjeta,
      enviarTarjeta,
      onFilePicked,
      coords,
      imagen,
      manejoImagen,
      imagenPreview
    };
  },
});
</script>

<style>
.categoria {
  background-color: #E6E7E8;
  border: 1px solid black;
  border-radius: 5px;
}
.categoria:hover {
  background-color: white;
}
hr.hr1 {
  border-top: 1px solid black;
  margin-top: 0px;
  margin-bottom: 0px;
}
.requerido {
  color: red;
}

.p-highlight{
  border-color: red !important;
  background: red !important;
}
</style>
