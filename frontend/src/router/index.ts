import { createRouter, createWebHistory } from "vue-router";
import WelcomeVue from "@/views/Welcome.vue";
import FullStackTestVue from "@/views/FullStackTest.vue";
import NotFoundVue from "@/views/NotFound.vue";
import AuthTestVue from "@/views/AuthTest.vue";
import LoginCreate from "@/views/LoginCreate.vue";
import store from '@/stores/store';

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "Home",
      redirect: "/Welcome",
    },
    {
      path: "/welcome",
      name: "Welcome",
      component: WelcomeVue,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginCreate,
      // @ts-ignore
      params: {
        action: "login",
      },
      props: {
        userAction: "login",
      },
    },
    {
      path: "/CreateAccount",
      name: "CreateAccount",
      component: LoginCreate,
      props: {
        userAction: "create",
      },
    },
    {
      path: "/AuthTest",
      name: "AuthTest",
      component: AuthTestVue,
      meta: { requiresAuth: true },
    },
    {
      path: "/FullStackTest",
      name: "FullStackTest",
      component: FullStackTestVue,
    },
    {
      path: "/404",
      name: "Not Found",
      component: NotFoundVue,
    },
    {
      path: "/:catchAll(.*)", // Unrecognized path automatically matches 404
      redirect: "/404",
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !store.getters['auth/isLoggedIn']) {
    return {
      path: "/login",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
