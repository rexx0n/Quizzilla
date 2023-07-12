<template>
    <div class="container">
        <div>
            <h1>Quizzilla</h1>
            <EnterPin></EnterPin>
            <div class="quizzes">
                <h2>Викторины</h2>
                <ul>
                    <li v-for="quizz in quizzes" :key="quizz.id">
                        <!--                    <a href=""></a>-->
                        <a href="#" @click.prevent="onSelectGame(quizz.id)">
                            {{ quizz.title }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import supabase from "@/lib/supabase";
import {onMounted, ref} from "vue";
import {useQuizHost} from "@/composible/useQuizHost";
import {useRouter} from "vue-router";
import EnterPin from "@/components/EnterPin.vue";

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

function onClickBtn(hostOrClient) {
    store.user = hostOrClient
    router.push(({
        name: 'join'
    }))
}


onMounted(async () => {
    const {data, error} = await supabase
        .from('quizzes')
        .select()
    quizzes.value = data
})
</script>

<style scoped>


.quizzes {
    margin-top: 50px;
}
h2 {
    font-size: 30px;
}
li {
    cursor:pointer;
    list-style-type: none;
    padding: 20px;
    border: 1px solid #BBBBBB;
    border-radius: 4px;
}
li:hover {
    background: #f1f1f1;
}

li:active {
    background: #dddddd;
    transition: 200ms;
}
ul {
    display: flex;
    gap: 30px;
    justify-content: center;
}
a {
    font-size: 27px;
}
h1 {
    font-size: 52px;
}
</style>