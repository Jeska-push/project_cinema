<template>
    <div class="form__reg">
        <div class="form__reg-block">
            <div class="close" @click="closePopup"><img src="../assets/img/icon/close-button.png" alt=""> </div>
            <div class="reg">
                <div class="reg__logo">
                    <a href="#" class="logo">
                        <img src="../assets/img/logoPopup.png" alt="">
                    </a>
                </div>
                <form action="" method="dialog">
                    <ul class="reg__list">
                        <li class="reg__item" style="background-image: url('src/assets/img/icon/reg/email.png')">
                            <input type="email" placeholder="Электронная почта" v-model="email">
                        </li>
                        <li class="reg__item" style="background-image: url('src/assets/img/icon/reg/key.png')">
                            <input type="password" placeholder="Пароль" v-model="password">
                        </li>
                        <div v-if="isActive" class="error_dop">Пароли не совпадают</div>
                    </ul>
                    <button class="btn-submit" type="submit" @click="postForm">Войти</button>
                    <button type="button" class="btn"
                        @click="regStore.isFormAuth = false, regStore.isFormReg = true">Регистрация</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { ref } from 'vue'
import { useRegStore } from "@/stores/reg"
import { postCurrentUser, profile } from "@/api/account"

const regStore = useRegStore();
const isActive = ref(false)
const email = ref('')
const password = ref('')
const emit = defineEmits(['closePopupReg', 'closePopupR']);


const postForm = async () => {
    const currentUser = await postCurrentUser(email.value,
        password.value);
    if (currentUser.result === true) {
        regStore.isAuthor = true
        const response = await profile()
        regStore.userName = response.name;
        regStore.userSurName = response.surname;
        regStore.userEmail = response.email;
        regStore.isFormAuth = false
        closePopup()
    }
}

const closePopup = () => {
    regStore.isFormAuth = false
}
</script>

<style scoped>
.form__reg-block {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 564px;
    height: 709.5px;
    z-index: 1000;
}

.reg {

    padding: 64px 40px;
    margin: auto;
    width: 420px;
    border-radius: 24px;
    background-color: white;
}

.reg__title {
    margin-bottom: 24px;
    display: flex;
    justify-self: center;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    color: rgba(0, 0, 0, 1);
}

.reg__logo {
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
}

.reg__list {
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 340px;
}

.reg__item {
    padding: 16px 50px;
    width: 340px;
    height: 56px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    background-position: 5% 50%;
    background-size: 24px;
    background-repeat: no-repeat;
}

.reg__item input {
    border: none;
}

.reg__item input:focus,
.reg__item input:active {
    outline: none;
}

.btn-submit {
    margin-bottom: 24px;
    width: 100%;
    padding: 16px 48px;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    border-radius: 28px;
    background-color: rgba(103, 165, 235, 1);
    color: white;
    border: none;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.btn-submit:hover,
.btn-submit:focus {
    background-color: rgba(69, 82, 110, 1);
    color: rgba(255, 255, 255, 0.5);
}

.btn {
    display: flex;
    justify-self: center;
    background-color: white;
    border: none;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: border-bottom 0.3s ease-in-out;
}

.btn:hover,
.btn:focus {
    border-bottom: 1.5px solid;
}

.error {
    border: 1px solid red;
}

.error_dop {
    color: red;
}

.close {
    position: absolute;
    top: 0px;
    right: 0;
    z-index: 500;
}

@media (max-width: 640px) {

    .reg {
        padding-left: 20px;
        padding-right: 20px;
        width: 335px;
    }

    .reg__item {
        width: 295px;
    }

    .close {
        top: 5px;
        right: 120px;
    }

    .reg__item {
        width: 295px;
    }

}
</style>