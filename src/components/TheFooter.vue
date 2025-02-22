<template>
    <div class="footer__container">
        <ul class="footer__list">
            <li class="footer__item" v-for="(item, index) in socialContacts" :key="index"><a href="#">
                    <img :src="item" alt="">
                </a></li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import imageUrl1 from '@/assets/img/icon/footer/vk.svg'
import imageUrl2 from '@/assets/img/icon/footer/youtube.svg'
import imageUrl3 from '@/assets/img/icon/footer/ok.svg'
import imageUrl4 from '@/assets/img/icon/footer/telegram.svg'
const socialContacts = ref([
    imageUrl1, imageUrl2, imageUrl3, imageUrl4,
])

</script>
<style scoped>
.footer__container {
    padding-top: 40px;
    padding-bottom: 40px;
}

.footer__list {
    display: flex;
    justify-content: flex-end;
    gap: 24px;
}

@media (max-width: 800px) {
    .footer__list {

        justify-content: flex-start;

    }
}
</style>