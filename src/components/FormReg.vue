<template>
    <div class="form__reg" v-if="regStore.isFormReg">
        <div class="form__reg-block">
            <div class="close" @click="regStore.isFormReg = false" type="reset"><img
                    src="../assets/img/icon/close-button.png" alt="">
            </div>
            <div class="reg">
                <div class="reg__logo">
                    <a href="#" class="logo">
                        <img src="../assets/img/logoPopup.png" alt="">
                    </a>
                </div>
                <h2 class="reg__title">Регистрация</h2>
                <form action="" method="dialog" ref="form" @submit="submitForm">
                    <ul class="reg__list">
                        <li class="reg__item" :class="{ error: item.pattern === true }" v-for="(item, index) in arr"
                            :key="index"
                            :style="item.pattern === false ? `background-image: url(${item.url}` : `background-image:url(${item.url1})`">
                            <input :type="item.type" :placeholder="item.placeholder" :name="item.name" ref="inputs"
                                :value="arr[index].value" v-model="arr[index].value">
                        </li>
                        <div v-if="isActive" class="error_dop">Пароли не совпадают</div>
                        <div v-if="isAct" class="error_dop">У вас уже есть аккаунт</div>
                    </ul>
                    <button class="btn-submit" type="reset" @click="postForm">Создать аккаунт</button>
                    <button type="button" class="btn" @click="regStore.isFormReg = false, regStore.isFormAuth = true">У
                        меня есть пароль</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reg } from "@/api/account";
import type { IUser } from "@/types/product";
import { ref } from 'vue'
import { arr } from "@/constants";
import { useRegStore } from "@/stores/reg";

const inputs = ref([{}])
const isActive = ref(false)
const form = ref()
const isAct = ref(false)
const regStore = useRegStore();
const emit = defineEmits(['closePopupReg', 'closePopupR', 'isOpenAuth']);


const submitForm = () => {
    form.value.reset()
}

const postForm = async () => {
    const name = ref(arr.value[1].value);
    const surname = ref(arr.value[2].value);
    const password1 = ref(arr.value[3].value);
    const password2 = ref(arr.value[4].value);
    const error = ref(false)
    const isCyrillic = (str: string) => {
        //Функция проверки букв на кириллицу
        return /[а-я]/i.test(str);
    }

    if (isCyrillic(name.value) === false) {
        arr.value[1].pattern = true
    }
    else {
        arr.value[1].pattern = false
    }
    if (isCyrillic(surname.value) === false) {
        arr.value[2].pattern = true
    }
    else {
        arr.value[2].pattern = false
    }


    if (password1.value !== password2.value) {
        isActive.value = true
        arr.value[3].pattern = true
        arr.value[4].pattern = true
    }
    arr.value.forEach((item) => {
        if (item.pattern === true) {
            error.value = true
            return false
        }
    })

    if (error.value === false) {
        const object = ref<IUser>({
            email: arr.value[0].value,
            name: arr.value[1].value,
            surname: arr.value[2].value,
            password: arr.value[3].value,
        })

        const response = await reg(object.value);

        if (response.success === true) {
            regStore.isFormReg = false
            regStore.isCompleted = true
            regStore.email = String(object.value.email);
            regStore.password = String(object.value.password);
            regStore.isAuthor = true
        }
        if (response.error === "User already exists") {
            isAct.value = true
        }
    }
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
    height: 709.5px;
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
    cursor: pointer;
}

.btn-submit:hover,
.btn-submit:focus {
    background: rgba(69, 82, 110, 1);
    color: rgba(255, 255, 255, 0.5);
}

.btn {
    display: flex;
    justify-self: center;
    background-color: white;
    border: none;
    cursor: pointer;
    border-bottom: transparent;
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
    margin-top: -10px;
}

.close {
    position: absolute;
    top: 0;
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