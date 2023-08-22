<template>
    <div class="container fade-in">
        <template v-if="!isPreparationFinish">
            <h1>Приготовтесь отвечать</h1>
            <h2>{{preparation}}</h2>
        </template>
        <template v-else>
            <div v-if="!done">
<!--                <button v-for="answer in answers" :key="answer.id" @click="onAnswer(answer)">{{ answer.title }}</button>-->
                <div class="btns">
                    <button @click="onAnswer(answers[0])" >A</button>
                    <button class="btn--pink" @click="onAnswer(answers[1])" >B</button>
                </div>
                <div class="btns">
                    <button class="btn--blue" @click="onAnswer(answers[2])" >C</button>
                    <button class="btn--green" @click="onAnswer(answers[3])" >D</button>
                </div>
            </div>
            <div class="waiting" v-else>
                <h1>Подождите пока закончится время</h1>
            </div>
        </template>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useQuizClient} from "@/composible/useQuizClient";
import router from "@/router/router.js";

const {store, sendAnswer} = useQuizClient()
let done = ref(false)
let preparation = ref(1)
let isPreparationFinish = ref(false)
//todo получить question по id
let answers = computed(() => {
    let question = store.quiz.questions.find(quest => quest.id === store.currentQuestionId)
    return question.answers
})

async function onAnswer(answer) {
    done.value = true
    await sendAnswer(answer)
}

function preparationTimer() {
    console.log('preparTimer')
    const preparationTimer = setInterval(() => {
        if (new Date() > store.question_start_at) {
            preparation.value = Math.max(Math.round((store.question_start_at - new Date()) / 1000),0)
            startTimer()
            console.log('If')
            isPreparationFinish.value = true
            clearInterval(preparationTimer)
        }
    }, 200)
}

function startTimer() {
    console.log('startTimer')
    const timer = setInterval(() => {
        if (new Date() > store.finishAt) {
            if (!done.value) {
                sendAnswer({correct:false})
            }
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
button:hover {
    background: rgb(210 174 45);
}
h3 {
    color: black;
}
.waiting {
    animation-duration: 1s;
    animation-name: opacity;
}
h2 {
    color: black;
}
.btns {
    justify-content: center;
    gap: 20px;
    display: flex;
    margin: auto auto 20px;
}
.btn--blue {
    background:rgb(184, 228, 223);
    color: rgb(3, 66, 58);
    border: 1px solid rgb(127, 171, 166);
    border-bottom: 4px solid rgb(127, 171, 166);
    border-right: 4px solid rgb(127, 171, 166);
}
.btn--blue:hover {
    background: rgb(138 203 195);
}
.btn--pink {
    background:rgb(254, 190, 191);
    color: rgb(116, 43, 44);
    border:1px solid rgb(197, 133, 134);
    border-right: 4px solid rgb(197, 133, 134);
    border-bottom: 4px solid rgb(197, 133, 134);
}
.btn--pink:hover {
    background: rgb(232 162 163);
}
.btn--green:hover {
    background: rgb(160 204 105);
}
.btn--green {
    background:rgb(182, 221, 134);
    color: rgb(57, 87, 20);
    border:1px solid rgb(125, 164, 77);
    border-right: 4px solid rgb(125, 164, 77);
    border-bottom: 4px solid rgb(125, 164, 77);
}
button {
    border: 1px rgb(183, 147, 19);
    border-radius: 0.375rem;
    display: flex;
    font-weight: 700;
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
    width: 100%;
    max-width: 690px;
    color: rgb(82, 66, 12);
    background:rgb(240, 204, 76) ;
    padding: 49px 53px;
    font-size: 30px;
    border-right: 4px solid rgb(183, 147, 19);
    border-bottom: 4px solid rgb(183, 147, 19);
}
@media screen and (max-width: 900px) {
    button {
        font-size: 16px;
        padding: 25px 20px;
    }
    .btns {
        gap: 10px;
        margin-bottom: 10px;
    }
}
</style>