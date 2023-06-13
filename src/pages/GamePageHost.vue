<template>
    <div class="container">
        <div class="btn__next">
            <MyButton v-if="isFinished" @click="toListUsers">Дальше</MyButton>
        </div>
        <div v-if="isTimerRunning">
            <h1>{{currentQuestion.title}}</h1>
            <h1>{{timer}}</h1>
            <div class="progress">
                <div :style="{width: `${progress}%`}" class="progress--green">

                </div>
            </div>
        </div>
        <div v-else>
            <h1>{{ currentQuestion.title }}</h1>
            <h1>{{ leftSeconds }}</h1>
            <AnswerButtons v-if="currentQuestion.answers" :answers="currentQuestion.answers" :is-finished="isFinished"/>
        </div>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
import {useQuizHost} from "@/composible/useQuizHost";
import AnswerButtons from "@/components/AnswerButtons.vue";
import MyButton from "@/components/UI/MyButton.vue";

const {startRound, store, isLastQuestion, currentQuestion, endRound} = useQuizHost()
let isFinished = ref(false)
let leftSeconds = ref()
const isTimerRunning = ref(false)
const isCounting = ref(false);
const isCountEnd = ref(false)
const progress = ref(0)
let timer = ref(1)


const props = defineProps(['numberQuestion'])

function startTimerBefore () {
    isTimerRunning.value = true;
    const interval = setInterval(()=> {
        timer.value++
        progress.value = 103.5
        if (timer.value === 2) {
            startTimer()
            clearInterval(interval)
            isTimerRunning.value = false
        }
    }, 1000)
}
function startTimer() {
    const timer = setInterval(() => {
        leftSeconds.value = Math.round((store.question_finish_at - new Date()) / 1000)
        if (new Date() > store.question_finish_at) {
            isFinished.value = true
            clearInterval(timer)
        }
    }, 500)
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
.btn__next {
    display: flex;
    justify-content: flex-end;
}

.progress {
    background: #C4C4C4;
    height: 5px;
    width: 500px;
    margin: auto;
}
.progress--green {
    height: 5px;
    transition:  all 6s ease-out;
    background: linear-gradient(105.56deg, #E2F685 18.43%, #8AF9AD 89.58%);
}
</style>