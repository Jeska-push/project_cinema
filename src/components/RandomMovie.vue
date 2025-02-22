<template>
    <div class="randomMovie">
        <div class="randomMovie__container">
            <div class="randomMovie__left">
                <div class="randomMovie__left-box">
                    <div class="randomMovie__left-star">
                        {{ randomFilm.tmdbRating }}
                    </div>
                    <div class="randomMovie__left-year">
                        {{ randomFilm.releaseYear }}
                    </div>
                    <div class="randomMovie__left-genre-container flex">
                        <div v-for="(film, index) in randomFilm.genres" :key="index" class="randomMovie__left-genre">
                            {{ film }}
                        </div>
                    </div>
                    <div class="randomMovie__left-time">
                        {{ randomFilm.runtime }} мин
                    </div>
                </div>
                <h2 class="randomMovie__left-title">
                    {{ randomFilm.title }}

                </h2>
                <p class="randomMovie__left-text">
                    {{ randomFilm.plot }}
                </p>
                <div class="randomMovie__left-bottom">
                    <button type="button" class="btn-treyler btn" @click="playTrailer">Трейлер</button>
                    <RouterLink to=/film class="btn1">
                        <button type="button" class="btn-about btn">О фильме</button>
                    </RouterLink>
                    <button type="button" class="btn-update btn-heart" @click="addInfavourite"><img :src="srcfavorite"
                            alt=""></button>
                    <button type="button" class="btn-update btn-around" @click="restart"><img
                            src="../assets/img/icon/around-button.svg" alt=""></button>
                </div>
            </div>
            <div class="randomMovie__right">
                <img :src="url" alt="фото">
            </div>
        </div>
    </div>
    <TopFilm />
    <div class="trailerModal">
        <transition-group name="fade">
            <TrailerPopup v-if="wrapper">
                <div class="trailerModal_close"
                    :style="win > 800 ? `width: ${width + 200}px; height: ${height}px` : `width: ${width}px; height: ${height}px`">
                    <iframe class="trailerModal_popup" title="Inline Frame Map"
                        :style="`width: ${width}px ;height: ${height}px`"
                        :src="`https://www.youtube.com/embed/${randomFilm.trailerYouTubeId}`" frameborder="0"
                        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>

                    </iframe>
                    <img src="../assets/img/icon/close-button.png" alt="" @click="closeTrailer">
                </div>

            </TrailerPopup>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getRandomFilm } from "@/api/product"
import { postFavourites, deleteFilm } from "@/api/account"
import TrailerPopup from '@/components/TrailerPopup.vue'
import TopFilm from '@/components/TopFilm.vue'
import { useRegStore } from "@/stores/reg"
import type { IFilm } from "@/types/product"

const width = ref(960)
const height = ref(540)
const regStore = useRegStore();
const srcfavorite = ref('./src/assets/img/icon/heart-button.svg')
const win = ref(0)
const emit = defineEmits(['clickTrailer', "closeWrapper"]);

const randomFilm = ref<IFilm[{}]>([]);
const url = ref('')
const trailerYouTubeId = ref('');
const wrapper = ref(false)

const getRandomFilms = async () => {
    let random: IFilm[{}] = await getRandomFilm();
    randomFilm.value = random.film;
    url.value = random.film.backdropUrl;
}
getRandomFilms()

const playTrailer = () => {
    trailerYouTubeId.value = randomFilm.value.trailerYouTubeId;
    wrapper.value = true
    emit("clickTrailer", wrapper.value);
}
const addInfavourite = async () => {
    if (regStore.isAuthor == false) {
        regStore.isFormReg = true
    }
    if (regStore.isAuthor === true) {
        if (srcfavorite.value == '../src/assets/img/icon/heart-button1.svg') {
            srcfavorite.value = '../src/assets/img/icon/heart-button.svg'
            await deleteFilm(randomFilm.value.id)
        } else {
            srcfavorite.value = '../src/assets/img/icon/heart-button1.svg'
            await postFavourites(randomFilm.value.id)
        }
    }
}
const closeTrailer = () => {
    wrapper.value = false
    emit("clickTrailer", wrapper.value);
}
const restart = () => {
    window.location.reload();
}
window.addEventListener('resize', () => {
    win.value = window.innerWidth;
    if (window.innerWidth < 1200 && window.innerWidth > 800) {
        width.value = 620;
        height.value = 420;
    }
    if (window.innerWidth < 800) {
        width.value = 375;
        height.value = 206;
    }
    if (window.innerWidth > 1200) {
        width.value = 980;
        height.value = 540;
    }
});

</script>

<style scoped>
.randomMovie {
    position: relative;
    color: white;
}

.randomMovie__container {
    display: flex;
    gap: 20px;
}

.flex {
    display: flex;
}

.btn {
    padding: 12px 46px;
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;
    color: white;
    border: none;
    border-radius: 28px;
    cursor: pointer;
}

.trailerModal-box {
    position: relative;
    width: 100%;
}

.btn1 {
    display: flex;
}

.btn-around {
    border-radius: 28px;
    background-color: rgba(57, 59, 60, 100);
}

.btn-heart,
.btn-around {
    min-width: 68px;
    display: flex;
    background-color: transparent;
    border: none;
    cursor: pointer;
}


.btn-treyler {
    padding: 12px 46px;
    min-width: 171px;
    border-radius: 28px;
    color: white;
    border: none;
    background-color: rgba(103, 165, 235, 1);
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    cursor: pointer;

}

.btn-treyler:hover,
.btn-treyler:focus {
    background: rgba(69, 82, 110, 1);
    color: rgba(255, 255, 255, 0.5);

}

.btn-about {
    padding: 12px 49px;
    display: inline-block;
    white-space: nowrap;
    background-color: rgba(57, 59, 60, 100);
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.btn-about:hover,
.btn-about:focus {
    background-color: rgba(116, 116, 116, 1);
    color: rgba(255, 255, 255, 0.5);
}

.btn-update {
    padding: 0;
}

.randomMovie__left {
    display: flex;
    flex-direction: column;
    padding: 30px 0;
    padding-top: 76px;
    max-width: 600px;
    width: 47%;
    height: 100%;
}

.randomMovie__left-top {
    display: flex;
    align-items: start;
    font-size: 18px;
    line-height: 24px;
    font-weight: 400;
    gap: 16px;
}

.randomMovie__left-star {
    padding: 7px 18px;
    padding-left: 34px;
    padding-right: 25px;
    max-width: 70px;
    background-color: #308E21;
    border-radius: 16px;
    background-image: url('../assets/img/icon/star.png');
    background-repeat: no-repeat;
    background-position: 15px 8px;
    background-size: 15px
}

.randomMovie__left-year {
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
}

.randomMovie__left-box {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
}

.randomMovie__left-year,
.randomMovie__left-star {
    margin-right: 22px;
}

.randomMovie__left-time {
    margin-left: 10px;
}

.randomMovie__left-bottom {
    display: flex;
    flex-wrap: wrap;
    max-width: 600px;
    gap: 15px;
}

.randomMovie__left-title {
    margin-bottom: 16px;
    max-width: 100%;
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
    border-radius: 16px;
    width: 680px;
    height: 552px;
    overflow: hidden;
    z-index: 1;
}

.randomMovie__left-genre-container {
    display: flex;
    flex-wrap: wrap;
}

.randomMovie__right img {
    border-radius: 16px;
    width: 680px;
    height: 552px;
    object-fit: cover;
}

.trailerModal_popup {
    width: 960px;
    height: 540px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 150;
}

.trailerModal_close {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 3000;
}


.trailerModal_close img {
    display: flex;
    justify-self: end;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-in;
}

.fade-enter-from,
.fade-enter-to {
    opacity: 0;
}

.fade-leave-from,
.fade-leave-to {
    opacity: 1;
}

.trailerModal_close img {
    position: absolute;
    right: 0px;
    z-index: 2000;
}

@media (max-width: 1200px) {
    .randomMovie__container {
        display: flex;
        flex-direction: column-reverse;
    }

    .randomMovie__left,
    .randomMovie__right {
        max-width: 100%;
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

    .trailerModal_popup {
        width: 100%;

        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 150;
    }
}

@media (max-width: 700px) {

    .randomMovie {
        padding: 10px;
        z-index: -10;
    }

    .randomMovie__left {
        padding-top: 20px;
        width: 100%;
    }

    .randomMovie__container {
        display: flex;
        gap: 12px;
    }

    .randomMovie__left-top {
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        gap: 16px;
    }

    .randomMovie__left-title {
        font-size: 24px;
        font-weight: 700;
        line-height: 32px;

    }

    .randomMovie__left-text {
        margin-bottom: 30px;
        font-size: 18px;
        font-weight: 500;
        line-height: 24px;
    }

    .randomMovie__left-genre,
    .randomMovie__left-time,
    .randomMovie__left-year {
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
    }

    .randomMovie__left-bottom {
        gap: 10px;
    }

    .btn-about {
        padding: 12px 36px;
    }

    .randomMovie__right {
        min-width: 100%;
        margin-left: 0px;
    }

    .randomMovie__right img {
        width: 100%;
    }
}
</style>