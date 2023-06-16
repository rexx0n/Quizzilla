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
<!--                <button v-for="answer in answers" :key="answer.id" @click="onAnswer(answer)">{{ answer.title }}</button>-->
                <button @click="onAnswer(answers[0])" >{{answers[0].title}}</button>
                <button class="btn--blue" @click="onAnswer(answers[1])" >{{answers[1].title}}</button>
                <button class="btn--green" @click="onAnswer(answers[2])" >{{answers[2].title}}</button>
                <button class="btn--pink" @click="onAnswer(answers[3])" >{{answers[3].title}}</button>
            </div>
            <h1 v-else>Подождите</h1>
        </template>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useQuizClient} from "@/composible/useQuizClient";
import router from "@/components/UI/router";

const {store, sendAnswer} = useQuizClient()
let done = ref(false)
let preparation = ref(1)
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
        if (new Date() > store.question_start_at) {
            startTimer()
            clearInterval(preparationTimer)
            isPreparationFinish.value = true
        }
    }, 200)
}

function startTimer() {
    const timer = setInterval(() => {
        if (new Date() > store.finishAt) {
            router.push({
                name: 'endRound'
            })
            clearInterval(timer)
        }
    }, 200)
}

onMounted(() => {
    preparationTimer()
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
    color: black;
}

h2 {
    color: black;
}

.btns {
    justify-content: center;
    margin: auto;
    gap: 20px;
    display: flex;
    flex-wrap: wrap;
}
.btn--blue {
    background:rgb(184, 228, 223);
    color: rgb(3, 66, 58)
}
.btn--pink {
    background:rgb(254, 190, 191);
    color: rgb(116, 43, 44)
}
.btn--green {
    background:rgb(182, 221, 134);
    color: rgb(57, 87, 20)
}
button {
    border: 1px solid black;
    border-radius: 0.375rem;
    display: flex;
    font-weight: 700;
    align-items: center;
    justify-content: space-between;
    max-width: 350px;
    border-right: 4px solid black;
    border-bottom: 4px solid black;
    width: 100%;
    padding: 10px;
    color: rgb(82, 66, 12);
    font-size: 20px;
    background:rgb(240, 204, 76) ;
}
</style>