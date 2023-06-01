<template>
  <div class="container">
      <div class="btn__next">
          <MyButton v-if="isFinished" @click="toListUsers">Дальше</MyButton>
      </div>
      <div>
          <h1>{{question.title}}</h1>
          <h1>{{leftSeconds}}</h1>
          <AnswerButtons :answers="question.answers" :is-finished="isFinished"/>
          <MyButton>Следующий вопрос</MyButton>
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
const {startRound, store} = useQuizHost()
let isFinished = ref(false)
let leftSeconds = ref()
let question = computed(()=> {
    return store.quiz.questions[props.numberQuestion]
})
const props = defineProps(['numberQuestion'])

function startTimer () {
    const timer = setInterval(()=>{
        leftSeconds.value = Math.round((store.question_finish_at - new Date()) / 1000)
        if (new Date() > store.question_finish_at) {
            isFinished.value = true
            clearInterval(timer)
        }
    },500)
}
onMounted(()=> {
    startRound(props.numberQuestion)
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