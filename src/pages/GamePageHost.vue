<template>
  <div>
      <div v-if="isTimerRunning">
          <h1>какая викторина</h1>
          <h1>Вопрос</h1>
          <h1>{{timer}}</h1>
          <div class="progress">
              <div :style="{width: `${progress}%`}" class="progress--green">

              </div>
          </div>
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
const progress = ref(0)

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
        progress.value = 103.5
        if (timer.value === 7) {
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
progress {

}
.progress {
    background: gray;
    height: 5px;
    width: 500px;
    margin: auto;
}
.progress--green {
    height: 5px;
    transition:  all 6s ease-out;
    background: green;
}
</style>