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
                <h2 class="reg__title">Регистрация завершена</h2>
                <p>Используйте вашу электронную почту для входа</p>

                <button class="btn-submit" type="button" @click="enterAuth">Войти</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useRegStore } from "@/stores/reg"
const regStore = useRegStore();
const enterAuth = async () => {
    regStore.isFormAuth = true
    regStore.isCompleted = false
}
const closePopup = () => {
    regStore.isCompleted = false
}
</script>
<style scoped>
.form__reg-block {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 564px;
    height: 381.5px;
    z-index: 1000;
}

.reg {
    padding: 64px 40px;
    margin: auto;
    width: 420px;
    height: 381.5px;
    border-radius: 24px;
    background-color: white;
}

.reg p {
    margin-bottom: 24px;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;

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
    height: 328px;
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
}

.error {
    border: 1px solid red;
}

.error_dop {
    color: red;
}

.close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 500;
}

@media (max-width: 992px) {


    .close {
        position: absolute;
        top: 5px;
        right: 80px;
        z-index: 1100;
    }


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

        right: 120px;
  
    }

}
</style>