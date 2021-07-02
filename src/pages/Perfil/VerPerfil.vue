<template>
  <div class="p-col-12">
    <div v-if="editar == false">
      <img
        class="imageProfile"
        width="100"
        src="/images/usuario.svg"
        v-if="!user.image"
      />
      <img class="perfil" width="100" :src="user.image" v-else />
      <br />
      <input
        @change="onFilePicked"
        type="file"
        ref="file"
        style="display: none"
        accept="image/*"
      />
      <Button
        label="Cambiar"
        @click="$refs.file.click()"
        class="p-ml-2 p-button-outlined"
      />
      <p style="font-size:30px" class="p-text-bold p-text-uppercase">
        Mis Datos:
      </p>
      <p>
        <span class="p-text-capitalize p-text-bold">DNI:</span> {{ user.dni }}
      </p>
      <p>
        <span class="p-text-capitalize p-text-bold">Empleado número:</span>
        {{ user.employeeNumber }}
      </p>
      <p>
        <span class="p-text-bold">Nombre:</span>
        {{ user.nombre }}
      </p>
      <p>
        <span class="p-text-bold">Apellido:</span>
        {{ user.apellido }}
      </p>
      <p>
        <span class="p-text-capitalize p-text-bold">Email:</span>
        {{ user.email }}
      </p>
      <p>
        <span class="p-text-capitalize p-text-bold">Ciudad:</span>
        {{ user?.ciudad?.ciudades }}
      </p>
      <Button label="Editar" @click="editar = true" class="p-button-outlined" />
    </div>
    <div v-else>
      <form-editar-perfil :user="user" :state="stateUser" />
      <Button
        label="Guardar"
        @click="actualizarMiPerfil"
        class="p-button-outlined"
      />
      <Button
        label="Cancelar"
        @click="clickCancelar"
        class="p-button-outlined p-ml-2"
      />
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import { onMounted, reactive, ref } from "vue";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import FormEditarPerfil from "../../components/FormEditarPerfil.vue";
import UserService from "../../services/UserService";
export default {
  components: {
    Avatar,
    Button,
    FormEditarPerfil,
  },
  setup() {
    let user = ref({});
    let editar = ref(false);

    const {
      actualizarImagenPerfil,
      actualizarPerfil,
      state: stateUser,
    } = UserService();
    onMounted(() => {
      user.value = jwt_decode(localStorage.getItem("token")).user;
    });

    const actualizarMiPerfil = () => {
      const { id, nombre, apellido,dni, email } = user.value;
      let userSave = {
        id,
        nombre,
        apellido,
        dni,
        email,
      };
      actualizarPerfil(userSave);
    };

    const onFilePicked = async (event) => {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = async function(e) {
          actualizarImagenPerfil(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const clickCancelar = () => {
      user.value = jwt_decode(localStorage.getItem("token")).user;
      editar.value = false;
    };

    return {
      user,
      editar,
      actualizarMiPerfil,
      stateUser,
      clickCancelar,
      onFilePicked,
    };
  },
};
</script>

<style>
.perfil {
  border-radius: 50%;
}
</style>
