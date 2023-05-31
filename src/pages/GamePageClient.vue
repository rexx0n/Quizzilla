<template>
    <div>
        <AnswerButtons></AnswerButtons>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import AnswerButtons from "@/components/AnswerButtons.vue";
import {useQuizClient} from "@/composible/useQuizClient";
let isFinished = ref(false)
const {store, startRound} = useQuizClient()
//todo получить question по id

function startTimer () {
    const timer = setInterval(()=>{
        if (new Date() > store.finishAt) {
            isFinished.value = true
            clearInterval(timer)
        }
    },500)
}

onMounted(()=> {
    startTimer()
})
</script>

<style scoped>

</style>