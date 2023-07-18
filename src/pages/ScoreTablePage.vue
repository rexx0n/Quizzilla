<template>
    <div class="container fade">
        <h3>Вопрос {{store.currentQuestionIndex + 1}} из {{store.quiz.questions.length}}</h3>
        <div class="btn">
            <MyButton @click="toNext">Следующий вопрос</MyButton>
        </div>
        <h1>Игроки</h1>
        <UserList :room-id="store.room.id" ></UserList>
        <h2>Код комнаты: {{store.room.pin}}</h2>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import UserList from "@/components/UserList.vue";
import {useQuizHost} from "@/composible/useQuizHost";
const {store} = useQuizHost()

const router = useRouter()
function toNext() {
    router.push({
        name:'game',
        params: {numberQuestion: store.currentQuestionIndex + 2}
    })
}

</script>

<style scoped>
.btn {
    display: flex;
    justify-content: flex-end;
}
</style>