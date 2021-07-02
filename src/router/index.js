import { createWebHistory, createRouter } from "vue-router";
import HomeLayout from "../layouts/HomeLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import DashboardIndex from "../pages/Dashboard/index.vue";

import GestionarTarjetas from "../pages/Tarjetas/Gestionar.vue";
import AgregarTarjeta from "../pages/Tarjetas/AgregarTarjeta.vue";
import ListadoTarjetas from "../pages/Tarjetas/Listado.vue";

import VerTarjeta from "../pages/Tarjetas/VerTarjeta.vue";

import ListadoUsuarios from "../pages/Usuarios/Listado.vue";
import CrearUsuario from "../pages/Usuarios/Crear.vue";

import VerPerfil from "../pages/Perfil/VerPerfil.vue";

import IndexLocaciones from "../pages/Locaciones/Index.vue";

import RecuperarPass from "../pages/Usuarios/RecuperarContrasena.vue";
import RecuperarContrasena from "../pages/Usuarios/RecuperarContrasena.vue";
import RecuperarContrasenaForm from "../pages/Usuarios/RecuperarContrasenaForm.vue";
import terminosCondiciones from "../pages/Index/terminosCondiciones.vue";
import ListadoMisTarjetas from "../pages/Tarjetas/ListadoMisTarjetas.vue";
import ListadoMisAsignaciones from "../pages/Tarjetas/ListadoMisAsignaciones.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeLayout,
  },
  {
    path: '/politica-de-privacidad',
    name: 'politica-de-privacidad',
    component: terminosCondiciones,
  },
  {
    path: '/reset-password/:token',
    name: 'reset-password-form',
    component: RecuperarContrasenaForm,
    props: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard.index",
        component: DashboardIndex,
      },
      {
        path: "/dashboard/Tarjetas",
        name: "Dashboard.Tarjetas",
        component: ListadoTarjetas,
      },
      {
        path: "/dashboard/MisTarjetas",
        name: "Dashboard.MisTarjetas",
        component: ListadoMisTarjetas,
      },
      {
        path: "/dashboard/MisAsignaciones",
        name: "Dashboard.MisAsignaciones",
        component: ListadoMisAsignaciones,
      },
      {
        path: "/dashboard/Tarjetas/Gestionar",
        name: "Dashboard.Tarjetas.Gestionar",
        component: GestionarTarjetas,
      },
      {
        path: "/dashboard/Tarjetas/Agregar",
        name: "Dashboard.Tarjetas.Agregar",
        component: AgregarTarjeta,
      },
      {
        path: "/dashboard/Tarjetas/:id",
        name: "Dashboard.Tarjetas.Ver",
        component: VerTarjeta,
        props: true,
      },
      {
        path: "/dashboard/Usuarios",
        name: "Dashboard.Usuarios",
        component: ListadoUsuarios,
        props: true,
      },
      {
        path: "/dashboard/Usuarios/crear",
        name: "Dashboard.Usuarios.crear",
        component: CrearUsuario,
        props: true,
      },
      {
        path: "/dashboard/Perfil/ver",
        name: "Dashboard.Perfil.ver",
        component: VerPerfil,
        props: true,
      },
      {
        path: "/dashboard/Locaciones",
        name: "Dashboard.Locaciones.index",
        component: IndexLocaciones,
        props: true,
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const isAuthenticated = function() {
  return window.localStorage.token;
};

router.beforeEach((to, from, next) => {
  if (to.name === "Home" && isAuthenticated()) {
    return next({ name: "Dashboard.index" });
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated()) {
      next();
      return;
    }
    next("/");
  }

  return next();
});

export default router;
