import { createRouter, createWebHistory } from 'vue-router'
import page1Vue from "../views/page1.vue";
import page2Vue from '../views/page2.vue';
import page3Vue from '../views/page3.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Page1",
      component: page1Vue,
    },
    {
      path: "/one",
      name: "Page1",
      component: page1Vue,
    },
    {
      path: "/two",
      name: "Page2",
      component: page2Vue,
    },
    {
      path: "/three",
      name: "page3",
      component: page3Vue,
    }
  ]
})

export default router
