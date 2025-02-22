<template>
    <div class="searchFilm__container">

        <ul class="searchFilm__list">
            <div class="searchFilm__item-wrapper"></div>
            <li class="searchFilm__item" v-for="(film, index) in props.arrayFilter" :key="index" :id="film.id">
                <router-link to="film" class="searchFilm__item-film">
                    <div class="searchFilm__item1" :id="film.id" @click="PageFilm($event)"></div>

                    <div class="searchFilm__item-container" :id="film.id" @click="PageFilm($event)">
                        <img class="searchFilm__item-img" :src="film.posterUrl" alt="" :data-id="index" :id="film.id">
                        <div class="searchFilm__item-box">
                            <div class="searchFilm__item-top">
                                <div class="searchFilm__item-star">
                                    {{ film.tmdbRating.toFixed(1) }}
                                </div>
                                <div class="searchFilm__item-year">
                                    {{ film.releaseYear }}
                                </div>
                                <div class="searchFilm__item-genre-container flex">
                                    <div v-for="(item, index) in film.genres" :key="index"
                                        class="searchFilm__item-genre">
                                        {{ item }}
                                    </div>
                                </div>
                                <div class="searchFilm__item-time">
                                    {{ film.runtime }} мин
                                </div>
                            </div>
                            <h2 class="searchFilm__item-title"> {{ film.title }}</h2>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>

</template>

<script setup lang="ts">

import { ref, watch } from "vue"
import { getFilmOnId } from "@/api/product"
import { useFilmStore } from "@/stores/film"
const filmStore = useFilmStore();
const film = ref({})
const width = ref(false)

const emit = defineEmits(['closeSearch']);
const props = defineProps<{
    arrayFilter: any,
}>()



const PageFilm = async (event: any) => {
    filmStore.id = event.target.id;
    let getFilm = await getFilmOnId(event.target.id);
    film.value = getFilm.response;
    filmStore.film = film.value;
    localStorage.setItem('film', JSON.stringify(film.value))
    emit("closeSearch");
    filmStore.wrapperOnSearch = false
}

watch(() => film.value, async (newVal) => {
    film.value = newVal;
}, { deep: true });


</script>
<style scope>
.searchFilm__container {
    position: relative;
    padding: 8px;
    max-height: 476px;
    color: white;
    overflow: hidden;
    border-radius: 8px;
    display: flex;
}

.searchFilm__list {
    width: 100%;
}

.searchFilm__item-container {
    display: flex;
    gap: 16px;
}

.searchFilm__item-box {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.searchFilm__item-top {
    padding-top: 5px;
    display: flex;
    align-items: center;
}

.searchFilm__item {
    position: relative;
    padding: 20px 8px;

    display: flex;
    z-index: 100;
}

.searchFilm__item1 {
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 20px 8px;
    width: 543px;
    height: 92px;
    z-index: 120;
    background-color: transparent;
}

.searchFilm__item-star {
    padding: 2px 8px;
    max-width: 70px;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    background-color: #308E21;
    border-radius: 16px;
}

.searchFilm__item-year,
.searchFilm__item-star {
    margin-right: 10px;
}

.searchFilm__item-year {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.7);

}

.searchFilm__item-time {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.7);
}

.searchFilm__item-img {
    width: 40px;
    height: 52px;
}

.searchFilm__item-title {
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
}

.searchFilm__item-genre-container {
    display: flex;
    flex-wrap: wrap;
}

.searchFilm__item-genre {
    margin-right: 10px;
    display: flex;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.7);
    flex-wrap: wrap;
    color: white;
}

.searchFilm__item {
    cursor: pointer;
}

.searchFilm__item:hover {
    border: 1px solid white;
    border-radius: 6px;
}

@media (max-width: 992px) {
    .searchFilm__container {

        position: absolute;
        left: 20%;
        top: 50%;
    }
}

@media (max-width: 890px) {
    .searchFilm__container {
        position: absolute;
        top: 0;
        left: 0;
        min-height: max-content;
        overflow: visible;
        z-index: 1000;
    }


    .searchFilm__list {
        display: flex;
    }

    .searchFilm__item {
        max-width: 220px;
        height: 100%;
    }

    .searchFilm__item1 {
        z-index: 10000;
    }

    .searchFilm__item a {
        display: flex;
        height: 100%;
    }

    .searchFilm__item-container {
        display: flex;
        flex-direction: column;
    }

    .searchFilm__item-img {
        width: 158px;
        height: 206px;
    }

    .searchFilm__item-top {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
    }

    .searchFilm__item-star {
        margin-right: 100px;
    }

    .searchFilm__item-genre-container {
        padding: 5px;
        position: absolute;
        left: 60px;
        display: flex;
        gap: 10px;
        width: 70px;
        height: 20px;
        overflow: hidden;
        top: 0;
        z-index: 5000;
        background-color: rgb(66, 64, 64);
    }

    .searchFilm__item-genre-container:hover,
    .searchFilm__item-genre-container:focus {
        top: 0;
        height: max-content;
    }
}
</style>