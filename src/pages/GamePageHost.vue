<template>
    <div  class="container">
        <div :class="{mb: !isFinished}" class="btn__next">
            <MyButton v-if="isFinished" @click="toListUsers">Дальше</MyButton>
        </div>
        <div class="preview" v-if="isTimerRunningBefore">
            <h1>{{ currentQuestion.title }}</h1>
            <h1>{{ timer }}</h1>
            <div class="progress">
                <div :style="{width: `${progress}%`}" class="progress--green">
                </div>
            </div>
        </div>
        <div class="main" v-else>
            <h3>Вопрос {{props.numberQuestion}} из {{store.quiz.questions.length}}</h3>
            <h1>{{ currentQuestion.title }}</h1>
            <h1>{{ leftSeconds }}</h1>
            <AnswerButtons v-if="currentQuestion.answers" :answers="currentQuestion.answers" :is-finished="isFinished"/>
        </div>
        <h2>Код комнаты: {{ store.room.pin }}</h2>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
import {useQuizHost} from "@/composible/useQuizHost";
import AnswerButtons from "@/components/AnswerButtons.vue";
import MyButton from "@/components/UI/MyButton.vue";
//todo Сделать когда все отвечают таймер заканчивался
const {startRound, store, isLastQuestion, currentQuestion, endRound} = useQuizHost()
let isFinished = ref(false)
let leftSeconds = ref()
const isTimerRunningBefore = ref(false)
const progress = ref(0)
let timer = ref()


const props = defineProps(['numberQuestion'])

function startTimerBefore() {
    isTimerRunningBefore.value = true;
    const interval = setInterval(() => {
        progress.value = 100.2
         timer.value =  Math.max(Math.round((store.question_start_at - new Date()) / 1000),0)
        if (new Date() > store.question_start_at) {
            startTimer()
            isTimerRunningBefore.value = false
            clearInterval(interval)
        }
    }, 200)
}

function startTimer() {
    console.log('startTimer')
    const timer = setInterval(() => {
        leftSeconds.value = Math.max( Math.round((store.question_finish_at - new Date()) / 1000), 0)
        if (new Date() > store.question_finish_at) {
            isFinished.value = true
            clearInterval(timer)
        }
    }, 200)
}

async function toListUsers() {
    await endRound()
    if (isLastQuestion()) {
        await router.push({
            name: "endGame"
        })
    } else {
        await router.push({
            name: "scoreTable"
        })
    }
}

onMounted(() => {
    startRound(props.numberQuestion - 1)
    startTimerBefore()
})
</script>

<style scoped>
.mb {
    margin-bottom: 65px;
}
.preview {
    display: flex;
    flex-direction: column;
    gap: 30px;
}
.btn__next {
    display: flex;
    justify-content: flex-end;
}
.container {
    display: flex;
    flex-direction: column;
    justify-content:flex-end;
}
.main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 35px;
    height: 480px;
    transition: 1s;
    animation-duration: 1.5s;
    animation-name: opacity;
}
@keyframes opacity {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
h1 {
    font-size: 40px;
    margin: 0;
}
.progress {
    background: #C4C4C4;
    height: 5px;
    width: 500px;
    margin: auto;
}

.progress--green {
    height: 5px;
    transition: all 6s ease-out;
    background: #000;
}
</style>