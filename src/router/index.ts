import pAfvalwijzer from "@/pages/pAfvalwijzer.vue";
import pHome from "@/pages/pHome.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      name: "Homepage",
      path: "/",
      component: pHome,
    },
    {
      name: "Afvalwijzer",
      path: "/offalkalinder",
      component: pAfvalwijzer,
    },
  ],
});

export default router;
