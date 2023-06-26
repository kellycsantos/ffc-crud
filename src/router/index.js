import { createRouter, createWebHistory } from "vue-router";

import { pinia } from "../main";
import { useUserStore } from "../stores/user";

import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import LoggedArea from "../views/LoggedArea.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/:catchAll(.*)",
    //   name: "not-found",
    //   component: NotFound,
    // },
    {
      path: "/",
      name: "home",
      component: LoginView,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUpView,
    },
    {
      path: "/clients",
      name: "clients",
      component: LoggedArea,
      meta:{
        requiresAuth: true
      }
      
    },
  ],
});


export default router;
