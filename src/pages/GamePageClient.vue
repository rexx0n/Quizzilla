<template>
    <div>
        <template v-if="!done">
            <button v-for="answer in answers" :key="answer.id" @click="onAnswer(answer)">{{ answer.title }}</button>
        </template>
        <h1 v-else>WAITING</h1>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useQuizClient} from "@/composible/useQuizClient";
import router from "@/components/UI/router";

const {store, sendAnswer} = useQuizClient()
let done = ref(false)
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

function startTimer() {
    const timer = setInterval(() => {
        if (new Date() > store.finishAt) {
            router.push({
                name:'endRound'
            })
            clearInterval(timer)
        }
    }, 500)
}

onMounted(() => {
    startTimer()
})
</script>

<style scoped>

</style>