<template>
  <div :class="containerClass" class="backgroundColor" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />

    <transition name="layout-sidebar">
      <div
        :class="sidebarClass"
        @click="onSidebarClick"
        v-show="isSidebarVisible()"
      >
        <div class="layout-logo">
          <router-link to="/">
            <img alt="Logo" :src="logo" />
          </router-link>
        </div>

        <AppProfile />
        <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
      </div>
    </transition>

    <div class="layout-main">
      <router-view :key="$route.fullPath" />
    </div>

    <AppFooter />
    <Toast />
  </div>
</template>

<script>
import AppTopBar from "./AppTopbar.vue";
import AppProfile from "./AppProfile.vue";
import AppMenu from "./AppMenu.vue";
import AppConfig from "./AppConfig.vue";
import AppFooter from "./AppFooter.vue";
import Toast from "primevue/toast";

export default {
  data() {
    return {
      layoutMode: "static",
      layoutColorMode: "dark",
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menu: [
        { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" },
        {
          label: "Tarjetas",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Agregar",
              icon: "pi pi-fw pi-id-card",
              to: "/dashboard/Tarjetas/Agregar",
            },
            {
              label: "Listado",
              icon: "pi pi-fw pi-list",
              to: { path: "/dashboard/Tarjetas", query: { q: "" } },
            },
            {
              label: "Mis tarjetas",
              icon: "pi pi-fw pi-list",
              to: { path: "/dashboard/MisTarjetas", query: { q: "" } },
            },
            {
              label: "Mis asignaciones",
              icon: "pi pi-fw pi-list",
              to: { path: "/dashboard/MisAsignaciones", query: { q: "" } },
            },
          ],
        },
        {
          label: "Usuarios",
          icon: "pi pi-fw pi-user",
          items: [
            {
              label: "Crear",
              icon: "pi pi-fw pi-desktop",
              to: { path: "/dashboard/Usuarios/crear" },
            },
            {
              label: "Listar",
              icon: "pi pi-fw pi-list",
              to: { path: "/dashboard/Usuarios", query: { q: "" } },
            },
          ],
        },
        {
          label: "Locaciones",
          icon: "pi pi-fw pi-globe",
          items: [
            {
              label: "Listar",
              icon: "pi pi-fw pi-list",
              to: { path: "/dashboard/Locaciones" },
            },
          ],
        },
        {
          label: "TAOS",
          icon: "pi pi-fw pi-sitemap",
          items: [
            {
              label: "Gestionar",
              icon: "pi pi-fw pi-pencil",
              to: "/dashboard/Tarjetas/Gestionar",
            },
          ],
        },
      ],
    };
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
    },
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }

      this.menuClick = false;
    },
    onMenuToggle() {
      this.menuClick = true;

      if (this.isDesktop()) {
        if (this.layoutMode === "overlay") {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }

          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === "static") {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }

      event.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode;
    },
    onLayoutColorChange(layoutColorMode) {
      this.layoutColorMode = layoutColorMode;
    },
    addClass(element, className) {
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    },
    removeClass(element, className) {
      if (element.classList) element.classList.remove(className);
      else
        element.className = element.className.replace(
          new RegExp(
            "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
            "gi"
          ),
          " "
        );
    },
    isDesktop() {
      return window.innerWidth > 1024;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === "static") return !this.staticMenuInactive;
        else if (this.layoutMode === "overlay") return this.overlayMenuActive;
        else return true;
      } else {
        return true;
      }
    },
  },
  computed: {
    containerClass() {
      return [
        "layout-wrapper",
        {
          "layout-overlay": this.layoutMode === "overlay",
          "layout-static": this.layoutMode === "static",
          "layout-static-sidebar-inactive":
            this.staticMenuInactive && this.layoutMode === "static",
          "layout-overlay-sidebar-active":
            this.overlayMenuActive && this.layoutMode === "overlay",
          "layout-mobile-sidebar-active": this.mobileMenuActive,
          "p-input-filled": this.$appState.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.ripple === false,
        },
      ];
    },
    sidebarClass() {
      return [
        "layout-sidebar",
        {
          "layout-sidebar-dark": this.layoutColorMode === "dark",
          "layout-sidebar-light": this.layoutColorMode === "light",
        },
      ];
    },
    logo() {
      return this.layoutColorMode === "dark"
        ? "/images/logo-taos-pequeño.png"
        : "/images/logo-taos-pequeño.png";
    },
  },
  beforeUpdate() {
    if (this.mobileMenuActive)
      this.addClass(document.body, "body-overflow-hidden");
    else this.removeClass(document.body, "body-overflow-hidden");
  },
  components: {
    AppTopBar: AppTopBar,
    AppProfile: AppProfile,
    AppMenu: AppMenu,
    AppConfig: AppConfig,
    AppFooter: AppFooter,
    Toast,
  },
};
</script>

<style>
.backgroundColor{
  background: white;
}
</style>
