<template>
    <div class="container">
        <div class="btn__next">
            <MyButton v-if="isFinished" @click="toListUsers">Дальше</MyButton>
        </div>
        <div>
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


const props = defineProps(['numberQuestion'])

function startTimer() {
    const timer = setInterval(() => {
        leftSeconds.value = Math.round((store.question_finish_at - new Date()) / 1000)
        if (new Date() > store.question_finish_at) {
            isFinished.value = true
            clearInterval(timer)
        }
    }, 500)
}

function toListUsers() {
    endRound()
    if (isLastQuestion()) {
        router.push({
            name: "endGame"
        })
    } else {
        router.push({
            name: "scoreTable"
        })
    }
}

onMounted(() => {
    startRound(props.numberQuestion - 1)
    startTimer()
})
</script>

<style scoped>
.btn__next {
    display: flex;
    justify-content: flex-end;
}

.btns {
    margin-bottom: 20px;
}
</style>