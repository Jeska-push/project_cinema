<template>
    <div class="aboutFilm">
        <div class="aboutFilm-title">О фильме</div>
        <div class="aboutFilm-container" v-if="width === false">
            <div class="aboutFilm-container-box">
                <div class="aboutFilm__text" v-for="(item, index) in arrayAboutFilm" :key="index">
                    <p class="aboutFilm__text-item aboutFilm__text-item1">{{ item }} </p>
                    <span class='aboutFilm__text-item1-span'></span>
                </div>
            </div>
            <div class="aboutFilm-container-box">
                <div class="aboutFilm__text" v-for="(item, index) in arrayAboutFilmApi" :key="index">
                    <div class="aboutFilm__text-item">{{ item }}</div>
                </div>
            </div>
        </div>
        <div class="aboutFilm-container-992" v-if="width">
            <div class="aboutFilm-container-box-992">
                <div class="aboutFilm__title-box">
                    <div class="aboutFilm__title-992">Язык оригинала </div>
                    <div>{{ arrayAboutFilmApi[0] }}</div>
                </div>
                <div class="aboutFilm__title-box">
                    <div class="aboutFilm__title-992">Бюджет </div>
                    <div>{{ arrayAboutFilmApi[1] }}</div>
                </div>
                <div class="aboutFilm__title-box">
                    <div class="aboutFilm__title-992">Выручка </div>
                    <div>{{ arrayAboutFilmApi[2] }}</div>
                </div>
                <div class="aboutFilm__title-box">
                    <div class="aboutFilm__title-992">Режиссёр </div>
                    <div>{{ arrayAboutFilmApi[3] }}</div>
                </div>
                <div class="aboutFilm__title-box">
                    <div class="aboutFilm__title-992">Продакшен </div>
                    <div>{{ arrayAboutFilmApi[4] }}</div>
                </div>
                <div class="aboutFilm__title-box">
                    <div class="aboutFilm__title-992">Награды </div>
                    <div>{{ arrayAboutFilmApi[5] }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IFilm } from "@/types/product"
import { useFilmStore } from "@/stores/film"
import { getFilmOnId } from "@/api/product"

const filmStore = useFilmStore();
const film = ref<IFilm[]>([]);
const width = ref(false)

const arrayAboutFilm = ref([
    'Язык оригинала', 'Бюджет', 'Выручка', 'Режиссёр', 'Продакшен', 'Награды'
])
const arr = ['language', 'budget', 'revenue', 'director', 'production', 'awardsSummary']
const arrayAboutFilmApi: any = ref([])
const getRandomFilm = (film: object) => {
    Object.entries(film).forEach(item => {
        arr.forEach((elem) => {
            if (elem === item[0]) {
                if (item[1] == null) {
                    arrayAboutFilmApi.value.push('нет');
                } else {
                    arrayAboutFilmApi.value.push(item[1]);
                }
            }
        })
    });
}
const global = async () => {

    if (filmStore.id) {
        let getFil = await getFilmOnId(filmStore.id);
        film.value = getFil.response;
        localStorage.setItem('film', JSON.stringify(film.value))
    }
    else {
        const filmInLocalStorage = localStorage.getItem('film');
        if (filmInLocalStorage && filmInLocalStorage !== 'undefined') {
            film.value = JSON.parse(filmInLocalStorage);
        }
    }
    getRandomFilm(film.value)
}
global();
window.addEventListener('resize', () => {
    if (window.innerWidth < 890) {
        width.value = true
    } else {
        width.value = false
    }
});

</script>
<style scoped>
.aboutFilm {
    padding-top: 40px;
    padding-bottom: 120px;
}

.aboutFilm-container {
    display: flex;
}

.aboutFilm-container-box {
    display: flex;
    flex-direction: column;
    gap: 24px
}

.aboutFilm-title {
    margin-bottom: 64px;
    font-size: 40px;
    font-weight: 700;
    line-height: 48px;
}

.aboutFilm__text {
    display: flex;
    width: 320px;
}

.aboutFilm__text-item {
    position: relative;
    width: 320px;
    color: white;
    z-index: 2;
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
}

.aboutFilm__text-item1 {
    position: relative;
    z-index: 2;
    margin-right: 8px;
    max-width: max-content;
}

.aboutFilm__text-item1-span {
    margin-right: 8px;
    border-width: 1px;
    border-bottom-style: dotted;
    border-color: rgba(255, 255, 255, 0.5);
    width: 300px;
}

.aboutFilm__text-992 {
    outline: 1px solid white;
    display: flex;
    width: 200px;
}

.aboutFilm-container-box-992 {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.aboutFilm__title-992 {
    display: flex;
    gap: 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.5);
}

.aboutFilm__title-992 span {
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    color: rgba(255, 255, 255, 1);
}
</style>