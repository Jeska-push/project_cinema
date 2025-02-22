<template>
    <transition name="fade">
        <slot>
        </slot>
    </transition>
</template>

<script setup lang="ts">



</script>
<style>


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

/*
.fade-enter-active {
    animation: bounce-in 3s;

}

.fade-leave-active {
    animation: bounce-in 3s reverse;

}

@keyframes bounce-in {
    0% {
        opacity: 0;

    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}
    */
</style>