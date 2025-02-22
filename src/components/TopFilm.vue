<template>
    <div class="topfilm">

        <div class="topfilm__container">
            <div class="topfilm-title">
                Топ 10 фильмов
            </div>
            <div class="topFilm-box">
                <div v-for="(film, index) in topFilm" :key="index" class="topfilm-list">

                    <router-link to=/film class="topfilm-item" @click="PageFilm($event)"> <img class="topfilm-item-img"
                            :src="film.posterUrl" alt="" :data-id="index">
                        <span>{{ index + 1 }}</span>
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { IFilm } from "@/types/product"
import { getRandomFilmTop10 } from "@/api/product"
import { useFilmStore } from "@/stores/film"

const filmStore = useFilmStore();
const topFilm = ref<IFilm[]>([]);
const currentFilm = ref<IFilm[{}]>([]);
const getRandomFilmsTop10 = async () => {
    const top = await getRandomFilmTop10();
    topFilm.value = top.response;
}
getRandomFilmsTop10()
const PageFilm = (event: any) => {
    topFilm.value.forEach((item, index) => {
        if (event.target.dataset.id == index) {
            currentFilm.value = item;
            filmStore.film = currentFilm.value
            localStorage.setItem('film', JSON.stringify(currentFilm.value))
        }
    })
}
</script>

<style scoped>
.topfilm {
    width: 100%;


}

.topfilm__container {
    padding-top: 40px;
    padding-bottom: 120px;
}

.topfilm-title {
    margin-bottom: 64px;
    font-size: 40px;
    font-weight: 700;
    line-height: 48px;
    color: rgba(255, 255, 255, 1);

}

.topFilm-box {
    display: flex;
    flex-wrap: wrap;
    gap: 60px;
    column-gap: 40px;
}

.topfilm-list {
    display: flex;
}

.topfilm-item {
    position: relative;
    border-radius: 16px;
    box-shadow: 0px 0px 80px 0px rgba(255, 255, 255, 0.33);
    z-index: 80;
}

.topfilm-item-img {

    width: 224px;
    height: 336px;
    border-radius: 16px;


}

.topfilm-item span {
    padding: 8px 20px;
    position: absolute;
    top: -10px;
    left: -10px;
    display: flex;
    justify-content: center;
    min-width: 62px;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    background-color: white;
    border-radius: 50px;
    z-index: 120;

}

@media (max-width: 700px) {
    .topfilm-title {
        margin-bottom: 30px;
        font-size: 24px;
        font-weight: 700;
        line-height: 32px;
    }

    .topFilm-box {
        padding-top: 10px;
        flex-wrap: nowrap;
        overflow: hidden;
    }

    .topfilm__container {
        padding-bottom: 0px;
    }
}
</style>