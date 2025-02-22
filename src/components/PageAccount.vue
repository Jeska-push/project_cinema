<template>
    <div class="account">
        <h2 class="accoun-title">Мой аккаунт</h2>
        <div class="account__link-box">
            <a href="#" v-if="width" class="account__link-favorites account__link"
                :class="{ 'account__link-line': isActive }" @click='isActive = true'>Избранное</a>
            <a href="#" v-if="width === false" class="account__link-favorites account__link"
                :class="{ 'account__link-line': isActive }" @click='isActive = true'>Избранные фильмы</a>
            <a href="#" v-if="width" class="account__link-settings account__link" @click="isActive = false"
                :class="{ 'account__link-line': isActive === false }">Настройки</a>
            <a href="#" v-if="width === false" class="account__link-settings account__link" @click="isActive = false"
                :class="{ 'account__link-line': isActive === false }">Настройка аккаунта</a>
        </div>
        <div class="film-box" v-if="isActive === true">
            <div v-for="(film, index) in regStore.arrayFavorites" :key="index" class="film-list">
                <router-link to=/film class="film-item" @click="PageFilm($event, film)">
                    <img class="film-item-img" :src="film.posterUrl" alt="">
                    <button class="wrapper" type='button' :data-id="film.id" @click="regStore.isFormReg = false">
                    </button>
                    <button class="close" @click.prevent="delFilm($event)" :data-close="film.id" type='button'>
                    </button>
                </router-link>
            </div>
        </div>
        <div class="settingAcc" v-if="isActive === false">
            <div class="settingAcc__item">
                <div class="settingAcc__item-icon">{{ regStore.userName[0].toUpperCase() }} {{
                    regStore.userSurName[0].toUpperCase() }}</div>
                <div class="settingAcc__item-text">
                    <div class="settingAcc__item-user settingAcc__item-user-label">Имя Фамилия</div>
                    <div class="settingAcc__item-user settingAcc__item-user-name">{{ regStore.userName }} {{
                        regStore.userSurName }}</div>
                </div>
            </div>
            <div class="settingAcc__item">
                <div class="settingAcc__item-icon"></div>
                <div class="settingAcc__item-text">
                    <div class="settingAcc__item-user settingAcc__item-user-label">Электронная почта</div>
                    <div class="settingAcc__item-user settingAcc__item-user-name">{{ regStore.userEmail }} </div>
                </div>
            </div>
            <button class="outAccount" type="button" @click="exit"> Выйти из аккаунта</button>
        </div>

    </div>

</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRegStore } from "@/stores/reg"
import { getFavourites, deleteFilm, closeSession } from "@/api/account"
import { useRouter } from 'vue-router'

const regStore = useRegStore();
const router = useRouter()
let arrayFavouritesFilm = ref([])
const isActive = ref(true)
const width = ref(false)


const getList = async () => {
    const favouritsFilm = await getFavourites();
    arrayFavouritesFilm.value = favouritsFilm.response
    regStore.arrayFavorites = arrayFavouritesFilm.value
}
getList()

const PageFilm = (event: any, film: any) => {
    film = arrayFavouritesFilm.value.find((item: any) => item.id == event.target.dataset.id);
}

const delFilm = async (event: any) => {
    await deleteFilm(event.target.dataset.close);
    const favouritsFilm = await getFavourites();
    arrayFavouritesFilm.value = favouritsFilm.response;
    regStore.arrayFavorites = arrayFavouritesFilm.value
}
const exit = async () => {
    await closeSession();
    regStore.userName = "Войти"
    regStore.isAuthor = false
    regStore.userSurName = ''
    regStore.userEmail = ''
    router.push({ path: '/' })
}
window.addEventListener('resize', () => {


    if (window.innerWidth < 800) {
        width.value = true;

    }
    else {
        width.value = false;
    }
});

</script>
<style scoped>
.account {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 64px;
    z-index: 100;
}

.close {
    display: flex;
    position: absolute;
    width: 40px;
    height: 40px;
    top: -20px;
    right: -20px;
    border: none;
    background-color: white;
    border-radius: 50%;
    z-index: 120;
    background-image: url('../assets/img/icon/close-button.png');
    background-position: center;
    background-size: cover;
    transition: all .4s ease;
    opacity: 0;
}

.wrapper {
    position: absolute;
    top: 0px;
    width: 224px;
    height: 336px;
    z-index: 110;
    background: transparent;
    border-radius: 16px;
}

.wrapper:hover~.close {
    opacity: 1;
}

.close:hover {
    opacity: 1;
}

.accoun-title {
    padding: 0;
    margin: 0;
    margin-bottom: 64px;
    font-size: 48px;
    font-weight: 700;
    line-height: 56px;
    color: white;
}

.account__link-box {
    display: flex;
    gap: 64px;
    max-width: 675px;
    min-width: 642px;
    min-height: 48px;
}

.account__link {
    padding-left: 32px;
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    color: white;
    background-repeat: no-repeat;
    background-position: 5px 5px;
    background-size: auto;
}

.account__link-line {
    display: flex;
    border-bottom: 1.5px solid rgba(220, 93, 252, 1);
}

.account__link-favorites {
    background-image: url('../assets/img/icon/account/favorite.svg');
}

.account__link-settings {
    background-image: url('../assets/img/icon/account/user.svg');
}

.film-box {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
}

.film-list {
    display: flex;
    border-radius: 16px;
}

.film-item {
    position: relative;

    border-radius: 16px;
    box-shadow: 0px 0px 80px 0px rgba(255, 255, 255, 0.33);
    z-index: 80;
}

.film-item-img {
    width: 224px;
    height: 336px;
    border-radius: 16px;

}

.settingAcc {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.settingAcc__item {
    display: flex;
    gap: 16px;
    color: white;
}

.settingAcc__item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    background-color: rgba(255, 255, 255, 0.5);
    color: rgba(255, 255, 255, 1);
    border-radius: 50%;
}

.settingAcc__item:last-child {
    background-image: url('../assets/img/icon/account/mail.png');
    background-repeat: no-repeat;
    background-position: 18px
}

.settingAcc__item-text {
    display: flex;
    flex-direction: column;

    color: white;
}

.settingAcc__item-user {
    display: flex;
    flex-grow: 1;
    align-items: center;
    color: white;
}

.settingAcc__item-user-label {
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
}

.settingAcc__item-user-name {
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
}

.outAccount {
    padding: 16px 44px;
    max-width: 262px;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    color: white;
    background-color: rgba(103, 165, 235, 1);
    border-radius: 28px;
    border: none;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    cursor: pointer;
}

.outAccount:hover,
.outAccount:focus {
    background-color: rgba(69, 82, 110, 1);
    color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 500px) {
    .account__link-box {

        gap: 20px;

    }

}
</style>