<template>
    <div class="filmsOneGenre">
        <div class="filmsOneGenre__container">
            <router-link to=/genres>
                <div class="genre-title">
                    {{ genre }}
                </div>
            </router-link>
            <div class="genre-box">
                <div v-for="(film, index) in filmStore.filmsByGenre" :key="index" class="genre-list">
                    <router-link to=/film class="genre-item" @click="PageFilm($event)"> <img class="genre-item-img"
                            :src="film.posterUrl" alt="" :data-id="film.id">
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFilmStore } from "@/stores/film"
import type { IFilm } from "@/types/product"


const filmStore = useFilmStore();
const filmsByGenre = ref<IFilm[]>([]);
const genre = ref('')

const PageFilm = async (event: any) => {
    filmStore.id = event.target.dataset.id
}

const general = () => {

    const genreInLocalStorage = localStorage.getItem('genre');
    if (genreInLocalStorage && genreInLocalStorage !== 'undefined') {
        genre.value = JSON.parse(genreInLocalStorage);
    }
    const filmsByGenreInLocalStorage = localStorage.getItem('filmsByGenre');
    if (filmsByGenreInLocalStorage && filmsByGenreInLocalStorage !== 'undefined') {
        filmStore.filmsByGenre = JSON.parse(filmsByGenreInLocalStorage);
    }
}
general();

watch(() => filmStore.filmsByGenre, async (newVal) => {
    filmStore.filmsByGenre = newVal;

}, { deep: true });

</script>


<style scoped>
.genre-title {
    padding-left: 56px;
    max-width: 332px;
    margin-bottom: 64px;
    font-size: 40px;
    font-weight: 700;
    line-height: 48px;
    color: rgba(255, 255, 255, 1);
    background-image: url('../src/assets/img/icon/genres/arrow.svg');
    background-repeat: no-repeat;
    background-position: 15px center;
    cursor: pointer;
}

.genre-box {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
}

.genre-list {
    display: flex;
}

.genre-item {
    position: relative;
    border-radius: 16px;
    box-shadow: 0px 0px 80px 0px rgba(255, 255, 255, 0.33);
    z-index: 110;
}

.genre-item-img {
    width: 335px;
    border-radius: 16px;
}

@media (max-width: 800px) {
    .genre-box {
        flex-wrap: nowrap;
        overflow: hidden;
    }
}
</style>