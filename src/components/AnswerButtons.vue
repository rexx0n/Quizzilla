<template>
    <div class="btns">
        <button>{{answers[0].title}}</button>
        <button class="btn--blue">{{answers[1].title}}</button>
        <button class="btn--orange">{{answers[2].title}}</button>
        <button class="btn--green">{{answers[3].title}}</button>
    </div>
</template>

<script setup>
import {reactive, ref} from "vue";

let answers = reactive([])
const props = defineProps(['answers','isFinished'])
for(let i = 0; i < props.answers.length; i++) {
    answers[i] = props.answers[i]
}
console.log(props.isFinished)
</script>

<style scoped>
.btn--blue {
    background: deepskyblue;
}

.btn--green {
    background: lightgreen;
}

.btn--orange {
    background: orange;
}

button {
    border: none;
    background: #dcb4b4;
    padding: 10px;
}

.btns {
    max-width: 300px;
    margin: auto;
    gap: 20px;
    display: flex;
    flex-wrap: wrap;
}
</style>