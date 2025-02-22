<template>
    <div class="genre">
        <div class="genre__container">
            <div class="genre-title">
                Жанры фильмов
            </div>
            <div class="genre-box">
                <div v-for="(genre, index) in genresAll" :key="index" class="topfilm-list">
                    <router-link to=/genre class="genre-item" @click="getGenres($event)"> <img class="topfilm-item-img"
                            src="../assets/img/unnamed.jpg" alt="" :data-id="index" :data-name="genre"><span
                            class="topfilm-item-span" :data-name="genre">{{ genre
                            }}</span>
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { genres, getFilterGenre } from "@/api/product"
import { useFilmStore } from "@/stores/film"
const filmStore = useFilmStore();
const genresAll = ref([])
const genre = ref('')
const filmsByGenre = ref([])

const genreF = async () => {
    const arr = await genres();
    genresAll.value = arr.response;
}
genreF();

const getGenres = (event: any) => {
    if (event.target.classList.contains('topfilm-item-img') || (event.target.classList.contains('topfilm-item-span'))) {
        genre.value = event.target.dataset.name
        localStorage.setItem('genre', JSON.stringify(genre.value))
    }
    const getGenre = async () => {
        const arr = await getFilterGenre(genre.value);
        filmsByGenre.value = arr.response;
        filmStore.filmsByGenre = filmsByGenre.value;
        localStorage.setItem('filmsByGenre', JSON.stringify(filmsByGenre.value));
    }
    getGenre()
}

</script>

<style scoped>
.genre {
    width: 100%;
}

.genre__container {
    padding-top: 40px;
    padding-bottom: 120px;
}

.genre-title {
    margin-bottom: 64px;
    font-size: 40px;
    font-weight: 700;
    line-height: 48px;
    color: rgba(255, 255, 255, 1);
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
    background-color: black;
    z-index: 110;
}

.genre-item span {
    padding-top: 30px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 290px;
    height: 84px;
    color: white;
    background-color: black;
    z-index: 150;
    text-align: center;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
}

.topfilm-item-img {
    max-width: 335px;
    height: 304px;
    border-radius: 16px;
}
</style>