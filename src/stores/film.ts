import { ref } from "vue";
import { defineStore } from "pinia";
import type { IFilm } from "@/types/product";

export const useFilmStore = defineStore("film", () => {
  const film = ref<IFilm[{}]>([]);
  const filmsByGenre = ref<IFilm[]>([]);
  const genre = ref("");
  const id = ref(0);
  const wrapperOnSearch = ref(false);

  return { film, filmsByGenre, genre, wrapperOnSearch, id };
});
