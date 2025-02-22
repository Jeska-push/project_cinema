import { ref } from "vue";
import { defineStore } from "pinia";
import type { IFilm } from "@/types/product";

export const useRegStore = defineStore("reg", () => {
  const isCompleted = ref(false);
  const isFormReg = ref(false);
  const email = ref("");
  const password = ref("");
  const isFormAuth = ref(false);
  const isAuthor = ref(false);
  const userName = ref("");
  const userSurName = ref("");
  const userEmail = ref("");
  const arrayFavorites = ref<IFilm[]>([]);
  return {
    isFormReg,
    isCompleted,
    email,
    password,
    isFormAuth,
    userName,
    arrayFavorites,
    userSurName,
    userEmail,
    isAuthor,
  };
});
