<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, watch } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import { useRegStore } from "@/stores/reg"
import { useFilmStore } from "@/stores/film"
const regStore = useRegStore();
const filmStore = useFilmStore();
let wrapper = ref(false)
let wrapperOnSearch = ref(false)
watch(() => [regStore.isFormReg, regStore.isCompleted, regStore.isFormAuth], async () => {
  if (regStore.isFormReg === true || regStore.isCompleted === true || regStore.isFormAuth === true) {
    setTimeout(() => {
      wrapper.value = true
    }, 300);
  }
  else {
    setTimeout(() => {
      wrapper.value = false
    }, 300);
  }
}, { deep: true })

watch(() => filmStore.wrapperOnSearch, () => {
  wrapperOnSearch.value = filmStore.wrapperOnSearch
}, { deep: true })

const clickTrailer = (wrap: any) => {
  wrapper.value = wrap
}


</script>

<template>
  <div class="container">
    <div :class="{ 'wrapper': wrapper, 'wrapperOnSearch': wrapperOnSearch }"></div>
    <TheHeader />
    <RouterView @clickTrailer="clickTrailer" />
    <TheFooter />
  </div>
</template>

<style>
@import './assets/css/normalize.css';
@import './assets/css/global.css';
@import './assets/css/main.css';

.container {
  position: relative;
  z-index: 1;
}

.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 130;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 11, 11, 0.9);
  opacity: 1;
}

.wrapperOnSearch {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 130;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
}
</style>
