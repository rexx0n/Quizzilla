<template>
    <div>
        <div class="main">
            <h1>Quizzilla</h1>
            <ul>
                <li v-for="quizz in quizzes" :key="quizz.id">
<!--                    <a href=""></a>-->
                    <a href="#" @click.prevent="onSelectGame(quizz.id)">
                        {{quizz.title}}
                    </a>
                </li>
            </ul>
            <div class="buttons">
                    <MyButton>
                        <router-link to="/join" @click="onClickBtn('client')">
                        Присоединиться
                        </router-link>
                    </MyButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import supabase from "@/lib/supabase";
import {onMounted, ref} from "vue";
import {useQuizHost} from "@/composible/useQuizHost";
import {useRouter} from "vue-router";
const quizzes = ref()
const {store, createRoom} = useQuizHost()
const pin = ref()
const roomPin = ref()
const router = useRouter()

async function onSelectGame(id) {
    await createRoom(id)
    await router.push({
        name: 'roomHost'
    })
    console.log(store.room, store.state)
}

function onClickBtn (hostOrClient) {
    store.user = hostOrClient
}


onMounted(async () => {
    const {data,  error} = await supabase
        .from('quizzes')
        .select()
        quizzes.value = data
})
</script>

<style scoped>

body {

}
.main {
    max-width: 500px;
    margin: auto;
}
.buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

</style>