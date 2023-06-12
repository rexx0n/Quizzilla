<template>
    <div>
        <template v-if="!isPreparationFinish">
            <h1>Приготовтесь отвечать</h1>
            <h2>{{preparation}}</h2>
        </template>
        <template v-else>
            <h2>{{ store.quiz.questions[0].order + 1 }} из {{ store.quiz.questions.length }}</h2>
            <h3>{{ Math.round(store.finishAt - Date.now()) }}</h3>
            <div class="btns" v-if="!done">
                <button v-for="answer in answers" :key="answer.id" @click="onAnswer(answer)">{{ answer.title }}</button>
            </div>
            <h1 v-else>WAITING</h1>
        </template>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useQuizClient} from "@/composible/useQuizClient";
import router from "@/components/UI/router";

const {store, sendAnswer} = useQuizClient()
let done = ref(false)
let preparation = ref(6)
let isPreparationFinish = ref(false)
//todo получить question по id
let answers = computed(() => {
    let question = store.quiz.questions.find(quest => quest.id === store.currentQuestionId)
    return question.answers
})
console.log(store.quiz,)

async function onAnswer(answer) {
    done.value = true
    await sendAnswer(answer)
}

function preparationTimer() {
    const preparationTimer = setInterval(() => {
        if (preparation.value >= 1) {
            preparation.value--
        } else {
            clearInterval(preparationTimer)
            isPreparationFinish.value = true
        }

    }, 1000)
}

function startTimer() {
    const timer = setInterval(() => {
        if (new Date() > store.finishAt) {
            router.push({
                name: 'endRound'
            })
            clearInterval(timer)
        }
    }, 500)
}

onMounted(() => {
    preparationTimer()
    startTimer()
})
</script>

<style scoped>
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

h3 {
    color: white;
}

h2 {
    color: white;
}

.btns {
    justify-content: center;
    margin: auto;
    gap: 20px;
    display: flex;
    flex-wrap: wrap;
}
</style>