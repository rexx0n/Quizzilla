<template>
  <div>
      <div v-if="isTimerRunning">
          <h1>какая викторина</h1>
          <h1>Вопрос</h1>
          <h1>{{timer}}</h1>
      </div>
      <div v-else>
          <h1>Вопрос</h1>
          <h1>{{count}}</h1>
          <AnswerButtons/>
          <MyButton @click="ToNext" v-if="isCountEnd">Следующий вопрос</MyButton>
      </div>

  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()
const timer = ref(1)
const isTimerRunning = ref(false)
const count = ref(30);
const isCounting = ref(false);
const isCountEnd = ref(false)

function ToNext() {
    router.push({
        name:'scoreTable'
    })
}
function startCountdown ()  {
    isCounting.value = true;
    const interval = setInterval(() => {
        count.value--;
        if (count.value === 0) {
            clearInterval(interval);
            isCounting.value = false;
            isCountEnd.value = true
        }
    }, 1000);
}

function startTimer () {
    isTimerRunning.value = true;
    const interval = setInterval(()=> {
        timer.value++
        if (timer.value === 6) {
            startCountdown()
            clearInterval(interval)
            isTimerRunning.value = false
        }
    }, 1000)
}
onMounted(()=> {
    startTimer()
})
</script>

<style scoped>

</style>