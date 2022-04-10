import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue';
import FullStackTest from '../views/FullStackTest.vue';
import NotFound from '../views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      redirect: '/Welcome',
    },
    {
      path: "/Welcome",
      name: "Welcome",
      component: Welcome,
    },
    {
      path: "/FullStackTest",
      name: "FullStackTest",
      component: FullStackTest,
    },
    {
      path: "/404",
      name: "Not Found",
      component: NotFound,
    },
    {
      path: "/:catchAll(.*)", // Unrecognized path automatically matches 404
      redirect: '/404',
    }
  ]
})

export default router
