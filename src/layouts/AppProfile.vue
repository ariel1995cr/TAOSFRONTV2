<template>
  <div class="layout-profile">
    <div>
      <img
        class="imageProfile"
        width="100"
        src="/images/usuario.svg"
        v-if="!user.image"
      />
      <img class="perfil" width="100" :src="user.image" v-else />
    </div>
    <button class="p-link layout-profile-link" @click="onClick">
      <span class="username p-text-capitalize">{{ user.nombre }} {{user.apellido}}</span>
      <i class="pi pi-fw pi-cog"></i>
    </button>
    <transition name="layout-submenu-wrapper">
      <ul v-show="expanded">
        <li>
          <router-link :to="'/dashboard/Perfil/ver'">
            <button class="p-link">
              <i class="pi pi-fw pi-user"></i><span>Cuenta</span>
            </button>
          </router-link>
        </li>
        <li>
          <button class="p-link">
            <i class="pi pi-fw pi-inbox"></i><span>Notificaciones</span
            ><span class="menuitem-badge">2</span>
          </button>
        </li>
        <li>
          <button class="p-link" @click="cerrarSesion()">
            <i class="pi pi-fw pi-power-off"></i><span>Cerrar Sesión</span>
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import router from "../router/index";
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      expanded: false,
      data: {},
      user: {},
    };
  },
  mounted() {
    this.user = jwt_decode(localStorage.getItem("token")).user;
  },
  methods: {
    onClick(event) {
      this.expanded = !this.expanded;
      event.preventDefault();
    },
    cerrarSesion() {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      router.push({ name: "Home" });
    },
  },
};
</script>

<style scoped></style>
