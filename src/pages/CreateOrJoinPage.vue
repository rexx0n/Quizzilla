<template>
    <Preloader v-if="!isLoad"></Preloader>
    <div v-else class="container fade-in">
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
import Preloader from "@/components/Preloader.vue"
import QInput from "@/components/UI/QInput.vue";

let isLoad = ref(false)
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
    isLoad.value = true
})
</script>

<style scoped>
button {
    padding: 15px 47px;
}

.quizzes {
    margin-top: 50px;
}
h2 {
    font-size: 30px;
    margin-bottom: 20px;
}
li {
    cursor:pointer;
    list-style-type: none;
    padding: 20px;
    border: 1px solid #BBBBBB;
    border-bottom: 4px solid #BBBBBB;
    border-right: 4px solid #BBBBBB;
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
    flex-wrap: wrap;
}
a {
    font-size: 27px;
}
h1 {
    font-size: 52px;
    margin-bottom: 20px;
}
@media screen and (max-width: 900px) {
    h1 {
        font-size: 30px;
    }
    a {
        font-size: 16px;
    }
    ul {
        gap: 10px;
    }
    h2 {
        font-size: 20px;
    }
    .quizzes {
        margin-top: 20px;
    }
}
</style>