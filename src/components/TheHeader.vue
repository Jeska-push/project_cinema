<template>
  <div class="flex header__container">
    <div class="header__container-w1920">
      <router-link to="/" class="header__logo">
        <img src="../assets/img/logo.png" class="logo-img" alt="логотип">
      </router-link>
      <nav class="header__nav nav">
        <ul class="header__list flex list-reset">
          <li class="header__item">
            <router-link to="/" href="#" class="nav__link">
              Главная
            </router-link>
          </li>
          <li class="nav__item">
            <router-link to="/genres" href="#" class="nav__link">
              Жанры
            </router-link>
          </li>
          <li class="nav__item nav__item-search">
            <input class="inputSearch" type="text" placeholder="Поиск" pattern="^[А-Яа-яЁё\s]+$" v-model="searchText">
            <button type="button" class="inputSearch-close" @click="closePopup">
              <img src="../assets/img/icon/close.png" alt="Закрыть">
            </button>
          </li>
        </ul>
      </nav>
      <button class="nav__item btn-enter nav__link-btn " :class="{ 'btn-enter-border': userName !== 'Войти' }"
        type="button" @click="enterAccount">
        {{ userName }}
      </button>
    </div>
    <div class="header__container-w992">
      <router-link to="/genres" href="#" class="nav__link1">
        <img src="../assets/img/icon/header/genres.svg" alt="">
      </router-link>
      <img src="../assets/img/icon/icon-search.png" class="header__container-w992-search" alt="" @click="searchSmall">
      <button class="nav__item btn-enter nav__link1 " :class="{ 'btn-enter-border': userName !== 'Войти' }"
        type="button" @click="enterAccount">
        <img src="../assets/img/icon/account/user.svg" alt="">
      </button>
    </div>
  </div>
  <div class="nav__link-container" v-if="openSearch">
    <button type="button" class='inputSearch-close1' @click="closePopup">
      <img src="../assets/img/icon/close.png" alt="Закрыть"> </button>
    <li class="nav__item nav__item-search" v-if="openSearch">
      <input class="inputSearch" :class="{ 'search': openSearch }" :type="searchText" placeholder="Поиск"
        pattern="^[А-Яа-яЁё\s]+$" v-model="searchText">
    </li>
  </div>
  <TrailerPopup>
    <SearchFilm class="search-film" v-if="searchText.length !== 0 && arrayFilter.length !== 0"
      :arrayFilter="arrayFilter" @closeSearch="closeSearch" />
    <FormReg v-if="regStore.isFormReg" />
    <FormAuth v-if="regStore.isFormAuth" />
    <RegCompleted v-if="regStore.isCompleted" />
  </TrailerPopup>
</template>

<script setup lang="ts">
import TrailerPopup from '@/components/TrailerPopup.vue'
import SearchFilm from '@/components/SearchFilm.vue'
import FormReg from '@/components/FormReg.vue'
import FormAuth from '@/components/FormAuth.vue'
import RegCompleted from '@/components/RegCompleted.vue'
import type { IFilm } from "@/types/product"
import { ref, watch } from "vue"
import { getFilmName } from "@/api/product"
import { useRegStore } from "@/stores/reg"
import { useFilmStore } from "@/stores/film"
import { useRouter } from 'vue-router'
const filmStore = useFilmStore();
const searchText = ref('');
const arrayFilter = ref<IFilm[]>([]);
const userName = ref('Войти')
const width = ref(true)
const openSearch = ref(false)
const wrapperOnSearch = ref(false)
const router = useRouter()
const regStore = useRegStore();


watch(() => searchText.value, async (newVal) => {
  searchText.value = newVal;
  const arr = await getFilmName(searchText.value);
  arrayFilter.value = arr.film
}, { deep: true })

watch(() => width.value, async (newVal) => {
  width.value = newVal;
}, { deep: true })

watch(() => regStore.userName, async (newVal) => {
  userName.value = newVal;
}, { deep: true })

const closePopup = () => {
  openSearch.value = false
  filmStore.wrapperOnSearch = openSearch.value;
  searchText.value = '';
}
const enterAccount = () => {
  if (userName.value === 'Войти') {
    regStore.isFormReg = true
  }
  else {
    router.push({ path: '/account' })
  }
}

const searchSmall = () => {
  openSearch.value = !openSearch.value
  wrapperOnSearch.value = !wrapperOnSearch.value
  filmStore.wrapperOnSearch = wrapperOnSearch.value
}
const closeSearch = (close: any) => {
  openSearch.value = false
  searchText.value = ''

}
</script>
<style scoped>
.header__container {
  display: flex;
  margin-bottom: 32px;
  padding: 24px 0px;
  padding-right: 0px;
  justify-content: space-between;
}

.header__container-w1920 {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.header__container-w992 {
  display: none;
  gap: 20px
}

.header__container-w992-search {
  display: flex;
  width: 24px;
  height: 24px;
  align-self: center;

}

.header__logo {
  display: flex;
  min-width: 145px;
  align-items: center;
  gap: 5px;
}

.header__nav {
  height: 48px;
  display: flex;
  align-items: center;

  max-width: 907.67px;

}

.header__list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 907.67px;
  gap: 40px;
}

.nav__link {
  display: flex;
  align-items: center;
  height: 48px;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  color: white;
  border-bottom: transparent;
  transition: border-bottom 0.5s ease;
}

.nav__link1 {
  display: flex;
  align-items: center;
  height: 48px;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  color: white;
  border-bottom: transparent;
  transition: border-bottom 0.5s ease;
  cursor: pointer;
}

.nav__link:hover {
  border-bottom: 1.5px solid rgba(220, 93, 252, 1);
}

.nav__link-container {
  position: relative;
  width: 100%;
  display: none;
}

.inputSearch {
  position: relative;
  padding: 12px 55px;
  width: 655.67px;
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  background-color: rgba(57, 59, 60, 1);
  color: white;
  background-image: url('../assets/img/icon/icon-search.png');
  background-position: center left 17px;
  background-size: 30px;
  background-repeat: no-repeat;
  border: none;
  border-radius: 8px;
  outline: none;
}

.btn-enter {
  font-size: 24px;
  line-height: 32px;
  font-weight: 400;
  background-color: transparent;
  color: white;
  border: transparent;
}

.btn-enter-border {
  border-bottom: 1.5px solid rgba(220, 93, 252, 1);
}

.nav__link-btn {
  display: flex;
  align-self: center;
}

.search-film {
  position: absolute;
  background-color: rgba(57, 59, 60, 1);
  right: 185px;
  top: 80px;
  z-index: 300;

}

.inputSearch-close,
.inputSearch-close1 {
  position: absolute;
  background-color: transparent;
  top: 38px;
  right: 0px;
  border: none;
  display: none;
}

.inputSearch-close img {
  width: 14px;
  height: 14px;
}

.header__container-none {
  display: none;
}

@media (max-width: 1220px) {

  .nav__link-container {
    z-index: 300;
  }

  .inputSearch {
    width: 350px;
    height: 56px;
  }

  .header__list {
    gap: 30px;
  }
}

@media (max-width: 890px) {

  .header__container {
    margin-bottom: 0;
    padding: 8px 0;
    justify-content: space-between;
  }

  .nav__link-container {
    display: flex;
  }

  .header__item {
    display: none;
  }

  .header__list {
    display: none;
  }

  .nav__link-btn {
    display: none;
  }

  .nav__item-search {
    position: absolute;
    width: 100%;
    height: 50px;
    top: -60px;
  }

  .inputSearch {
    width: 100%;
    top: -10px;
  }

  .search-film {
    width: 93%;
    left: 50%;
    top: 300px;
    right: 0;
    transform: translate(-50%, -50%);
    overflow: hidden;
  }

  .inputSearch-close1 {
    display: flex;
    top: -32px;
    right: 10px;
    z-index: 2000;
  }

  .header__container-w992 {
    display: flex;
  }
}

@media (max-width: 700px) {

  .header__container {
    margin-bottom: 0;
    padding: 8px 0;
    justify-content: space-between;
  }

  .header__container-w992 {
    display: flex;
    gap: 18px;
    max-width: 112px;
  }

  .header__logo {
    display: flex;
    transform: scale(.6) translateX(-50px);
    gap: 5px;
  }

  .search {
    display: flex;
  }

  .search-film {
    width: 93%;
    left: 50%;
    right: 0;
    transform: translate(-50%, -50%)
  }
}
</style>
