<template>
    <div class="container fade">
        <div>
            <h3>Вопрос {{store.currentQuestionIndex + 1}} из {{store.quiz.questions.length}}</h3>
            <div class="btn">
                <QButton @click="toNext">Следующий вопрос</QButton>
            </div>
            <h1>Игроки</h1>
            <UserList :room-id="store.room.id" ></UserList>
        </div>
        <h2>Код комнаты: {{store.room.pin}}</h2>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import UserList from "@/components/UserList.vue";
import {useQuizHost} from "@/composible/useQuizHost";
import QButton from "@/components/UI/QButton.vue";
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
.container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
h1 {
    margin-bottom: 100px;
    font-size: 40px;
}
@media screen and (max-width: 900px) {
    h1 {
        font-size: 20px;
        margin-bottom: 20px;
    }
    button {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 16px;
    }
    h2 {
        font-size: 15px;
        margin-bottom: 20px;
    }
    h3 {
        font-size: 13px;
    }
}
</style>