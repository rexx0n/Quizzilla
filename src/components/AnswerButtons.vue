<template>
    <div class="btns">
        <button :class="{opacity: !props.answers[0].correct && props.isFinished }" >{{ props.answers[0].title }}
            <img v-if="props.isFinished && props.answers[0].correct" src="../assets/tick.png" alt="">
            <img v-if="props.isFinished && !props.answers[0].correct" src="../assets/crosslinear_106242.png" alt="">
        </button>
        <button class="btn--yellow" :class="{opacity: props.isFinished && !props.answers[1].correct}">{{ props.answers[1].title }}
            <img v-if="props.isFinished && props.answers[1].correct" src="../assets/tick.png" alt="">
            <img v-if="props.isFinished && !props.answers[1].correct" src="../assets/crosslinear_106242.png" alt="">
        </button>
        <button class="btn--orange" :class="{opacity: props.isFinished && !props.answers[2].correct}" >{{ props.answers[2].title }}
            <img v-if="props.isFinished && props.answers[2].correct" src="../assets/tick.png" alt="">
            <img v-if="props.isFinished && !props.answers[2].correct" src="../assets/crosslinear_106242.png" alt="">
        </button>
        <button class="btn--green" :class="{opacity: props.isFinished && !props.answers[3].correct}">{{ props.answers[3].title }}
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
img {
    max-width: 20px;
}
.opacity {
    opacity: 0.45;
}
.btn--yellow {
    background: linear-gradient(139.33deg, #d4ff24 -14.59%, #ff2800 112.86%);
}
.btn--orange {
    background: linear-gradient(139.33deg, #EE6439 -14.59%, #ff48f6 99.86%);
}
.btn--green {
    background: linear-gradient(135deg, #00FFAA 0%, #25c915 53.01%, #f54242 99.83%);;
}
button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 150px;
    width: 100%;
    border: none;
    padding: 10px;
    font-size: 20px;
    background: linear-gradient(135deg, #00FFAA 0%, #4579F5 53.01%, #9C42F5 99.83%);
    border-radius: 17px;
}

.btns {
    justify-content: center;
    margin: auto;
    gap: 20px;
    display: flex;
    flex-wrap: wrap;
}
</style>