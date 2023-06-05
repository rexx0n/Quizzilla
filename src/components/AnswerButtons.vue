<template>
    <div class="btns">
        <button>{{ props.answers[0].title }}
            <img v-if="props.isFinished && props.answers[0].correct" src="../assets/tick.png" alt="">
            <img v-if="props.isFinished && !props.answers[0].correct" src="../assets/crosslinear_106242.png" alt="">
        </button>
        <button class="btn--blue">{{ props.answers[1].title }}
            <img v-if="props.isFinished && props.answers[1].correct" src="../assets/tick.png" alt="">
            <img v-if="props.isFinished && !props.answers[1].correct" src="../assets/crosslinear_106242.png" alt="">
        </button>
        <button class="btn--orange">{{ props.answers[2].title }}
            <img v-if="props.isFinished && props.answers[2].correct" src="../assets/tick.png" alt="">
            <img v-if="props.isFinished && !props.answers[2].correct" src="../assets/crosslinear_106242.png" alt="">
        </button>
        <button class="btn--green">{{ props.answers[3].title }}
            <img v-if="props.isFinished && props.answers[3].correct" src="../assets/tick.png" alt="">
            <img v-if="props.isFinished && !props.answers[3].correct" src="../assets/crosslinear_106242.png" alt="">
        </button>
    </div>
</template>

<script setup>
import {computed, reactive, ref} from "vue";


const props = defineProps(['answers', 'isFinished'])
</script>

<style scoped>
.btn--blue {
    background: deepskyblue;
}

img {
    max-width: 20px;
}

.btn--green {
    background: lightgreen;
}

.btn--orange {
    background: orange;
}

button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 150px;
    width: 100%;
    border: none;
    background: #dcb4b4;
    padding: 10px;
    font-size: 20px;
}

.btns {
    justify-content: center;
    margin: auto;
    gap: 20px;
    display: flex;
    flex-wrap: wrap;
}
</style>