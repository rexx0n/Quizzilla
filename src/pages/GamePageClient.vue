<template>
    <div>
        <div>
            <p>Номер вопроса</p>
            <p>Викторина</p>
        </div>
        <div v-if="isTimerRunning">
            <h1>Номер вопроса</h1>
            <h1>{{timer}}</h1>
        </div>
        <div v-else>
                <AnswerButtons/>
        </div>
            <div v-if="bool">
                <h1>правильный ответ или неправильный</h1>
            </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

const count = ref(30);
const isCounting = ref(false);
const timer = ref(1)
const isTimerRunning = ref(false)
const bool = ref(false)

function startCountdown ()  {
    isCounting.value = true;
    const interval = setInterval(() => {
        count.value--;
        if (count.value === 0) {
            clearInterval(interval);
            isCounting.value = false;
            bool.value = true
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