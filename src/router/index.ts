import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "RandomMovie",
      component: () => import("../components/RandomMovie.vue"),
    },
    {
      path: "/film",
      name: "/film",
      component: () => import("../components/TheFilm.vue"),
    },

    {
      path: "/genres",
      name: "genres",
      component: () => import("../components/TheGenres.vue"),
    },
    {
      path: "/genre",
      name: "genre",
      component: () => import("../components/TheGenre.vue"),
    },
    {
      path: "/account",
      name: "account",
      component: () => import("../components/PageAccount.vue"),
    },
  ],
});

export default router;
