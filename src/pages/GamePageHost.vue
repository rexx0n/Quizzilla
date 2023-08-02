<template>
    <div  class="container">
        <div>
            <div :class="{mb: !isFinished}" class="btn__next fade">
                <QButton v-if="isFinished" @click="toListUsers">Дальше</QButton>
            </div>
            <div class="preview fade" v-if="isTimerRunningBefore">
                <h1>{{ currentQuestion.title }}</h1>
                <h1 class="timer">{{ timer }}</h1>
            </div>
            <div class="main" v-else>
                <h3>Вопрос {{props.numberQuestion}} из {{store.quiz.questions.length}}</h3>
                <h1>{{ currentQuestion.title }}</h1>
                <h1>{{ leftSeconds }}</h1>
                <AnswerButtons v-if="currentQuestion.answers" :answers="currentQuestion.answers" :is-finished="isFinished"/>
            </div>
        </div>
        <h1 class="pin fade">Код комнаты: {{ store.room.pin }}</h1>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {onBeforeRouteLeave, onBeforeRouteUpdate, useRouter} from "vue-router";

const router = useRouter()
import {useQuizHost} from "@/composible/useQuizHost";
import AnswerButtons from "@/components/AnswerButtons.vue";
import QButton from "@/components/UI/QButton.vue";
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
//todo закрывать сессию
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
    justify-content: space-between;
}
.pin {
    margin-bottom: 100px;
}
.main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 35px;
    transition: 2s;
    animation-duration: 3s;
    animation-name: opacity;
}
h1 {
    font-size: 40px;
    margin: 0;
}
h2 {
    display: flex;
    justify-content: center;
}
</style>