<template>
  <div class="randomMovie">
    <div class="container">
      <div class="randomMovie__container">
        <div class="randomMovie__left">
          <div class="randomMovie__left-top flex">
            <div class="randomMovie__left-star">
              {{ filmStore.film.tmdbRating }}
            </div>
            <div class="randomMovie__left-year">
              {{ filmStore.film.releaseYear }}
            </div>

            <div class="randomMovie__left-time">
              {{ filmStore.film.runtime }} мин
            </div>
          </div>
          <h2 class="randomMovie__left-title">
            {{ filmStore.film.title }}
          </h2>
          <p class="randomMovie__left-text">
            {{ filmStore.film.plot }}
          </p>
          <div class="randomMovie__left-bottom">
            <button type="button" class="btn-treyler btn" @click="playTrailer">Трейлер</button>
            <button type="button" class="btn-favourites btn-around" @click="addInfavourite">
              <img :src="srcfavorite" alt="">
            </button>
          </div>
        </div>
        <div class="randomMovie__right">
          <img :src="filmStore.film.backdropUrl" alt="фото">
        </div>
      </div>
      <!-- <TrailerPopup v-if="wrapper === true" :urlTrailer="trailerYouTubeId" @closeTrailer="closeTrailer" /> -->
      <TrailerPopup v-if="wrapper">
        <iframe class="trailerModal_popup" width="960" height="540" title="Inline Frame Map"
          :src="`https://www.youtube.com/embed/${trailerYouTubeId}`" frameborder="0"
          allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
        <div class="trailerModal_close" @click="wrapper"><img src="../assets/img/icon/close-button.png" alt="">
        </div>
      </TrailerPopup>
    </div>
    <AboutFilm />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IFilm } from "@/types/product"
import { useFilmStore } from "@/stores/film"
import { getFilmOnId } from "@/api/product"
import { useRegStore } from "@/stores/reg"
import TrailerPopup from '@/components/TrailerPopup.vue'
import AboutFilm from '@/components/AboutFilm.vue'
import { deleteFilm, postFavourites, getFavourites } from "@/api/account"
const wrapper = ref(false)
const filmStore = useFilmStore();
const regStore = useRegStore();
const trailerYouTubeId = ref('');
const film = ref<IFilm[{}]>([]);
const srcfavorite = ref('../src/assets/img/icon/heart-button.svg')
const emit = defineEmits(['clickTrailer']);



const global = async () => {
  if (filmStore.id) {
    let getFil = await getFilmOnId(filmStore.id);
    filmStore.film = getFil.response;
    localStorage.setItem('film', JSON.stringify(filmStore.film))
  }
  else {
    const filmInLocalStorage = localStorage.getItem('film');
    if (filmInLocalStorage && filmInLocalStorage !== 'undefined') {
      filmStore.film = JSON.parse(filmInLocalStorage);
    }
  }
}
global();


const getFilm = async () => {

  if (regStore.isAuthor) {
    const res = await getFavourites();
    const u: IFilm[] = res.response.filter(item => item.id === film.value.id)
    if (u.length !== 0) {
      srcfavorite.value = '../src/assets/img/icon/heart-button1.svg'
    }
  }
}
getFilm();

const playTrailer = () => {
  trailerYouTubeId.value = film.value.trailerYouTubeId;
  wrapper.value = true
}

const addInfavourite = async () => {
  if (regStore.isAuthor == false) {
    regStore.isFormReg = true
  }
  if (regStore.isAuthor === true) {
    if (srcfavorite.value == '../src/assets/img/icon/heart-button1.svg') {
      srcfavorite.value = '../src/assets/img/icon/heart-button.svg'
      await deleteFilm(film.value.id)
    } else {
      srcfavorite.value = '../src/assets/img/icon/heart-button1.svg'
      await postFavourites(film.value.id)
    }
  }
}

</script>

<style scoped>
.randomMovie {
  position: relative;
  color: white;
}

.randomMovie__container {
  display: flex;
  gap: 10px;
  width: 100%;
  height: auto;
}

.flex {
  display: flex;
}

.btn {
  border-radius: 28px;
  padding: 16px 48px;
  color: white;
  border: none;
}

.btn-around {
  width: 68px;
  height: 56px;
  border-radius: 28px;
  border: none;
  background-color: transparent
}

.btn-treyler {

  background-color: rgba(103, 165, 235, 1);
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.btn-treyler:hover,
.btn-treyler:focus {
  background: rgba(69, 82, 110, 1);
  color: rgba(255, 255, 255, 0.5);
}

.btn-about {
  background-color: rgba(57, 59, 60, 100);
}

.randomMovie__left {
  width: 55%;
  height: 100%;
  padding: 30px 0;
  padding-top: 60px;
}

.randomMovie__left-top {
  padding: 10px 0;
  display: flex;
  align-items: start;
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  gap: 10px;
}

.randomMovie__left-star {
  padding: 4px 12px;
  max-width: 70px;
  background-color: #308E21;
  border-radius: 16px;
}

.randomMovie__left-year,
.randomMovie__left-star {
  margin-right: 10px;
}

.randomMovie__left-time {
  margin-left: 10px;
}

.randomMovie__left-bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.randomMovie__left-title {
  margin-bottom: 10px;
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
  color: white;
}

.randomMovie__left-text {
  margin-bottom: 60px;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  color: rgba(255, 255, 255, 70%)
}

.randomMovie__left-genre {
  margin-right: 10px;
  display: flex;
  flex-wrap: wrap;
}

.randomMovie__right {
  overflow: hidden;
}

.randomMovie__left-genre-container {
  display: flex;
  flex-wrap: wrap;
}

.randomMovie__right img {
  width: 100%;
  object-fit: contain;
}

@media (max-width: 1200px) {
  .randomMovie__container {
    display: flex;
    flex-direction: column-reverse;
  }

  .randomMovie__left,
  .randomMovie__right {
    width: 100%;
  }

  .randomMovie__right img {
    border-radius: 0;
    width: 100%;
    height: auto;
    overflow: hidden;
    z-index: 1;
    object-fit: cover;
  }

  .randomMovie__right {
    border-radius: 0;
    width: 100%;
    height: auto;
    overflow: hidden;
    z-index: 1;
    object-fit: cover;
  }

}

@media (max-width: 992px) {
  .randomMovie__container {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>