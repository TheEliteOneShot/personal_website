import { createRouter, createWebHistory } from 'vue-router'
import WelcomeVue from '../views/Welcome.vue';
import FullStackTestVue from '../views/FullStackTest.vue';
import NotFoundVue from '../views/NotFound.vue';
import AuthTestVue from '../views/AuthTest.vue';
import LoginVue from '../views/Login.vue';
import CreateAccountVue from '../views/CreateAccount.vue';
import auth from '../auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      redirect: '/Welcome',
    },
    {
      path: "/welcome",
      name: "Welcome",
      component: WelcomeVue,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginVue,
    },
    {
      path: "/CreateAccount",
      name: "CreateAccount",
      component: CreateAccountVue,
    },
    {
      path: "/AuthTest",
      name: "AuthTest",
      component: AuthTestVue,
      meta: { requiresAuth: true }
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
      redirect: '/404',
    }
  ]
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return {
      path: '/login'
    }
  }
})

export default router
