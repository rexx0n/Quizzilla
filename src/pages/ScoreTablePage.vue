<template>
    <div>
        <h1>Таблица игроков</h1>
        <UserList :room-id="store.room.id" ></UserList>
        <MyButton @click="toNext">Следующий вопрос</MyButton>
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
</style>