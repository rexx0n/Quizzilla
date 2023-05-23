<template>
    <div>
        <div class="main">
            <h1>Quizzilla</h1>
            <ul>
                <li v-for="quizz in quizzes" :key="quizz.id">
<!--                    <a href=""></a>-->
                    <router-link to="/gameHost" @click="onClick(quizz.id)">
                        {{quizz.title}}
                    </router-link>
                </li>
            </ul>
            <div class="buttons">
                    <MyButton>
                        <router-link to="/username" @click="onClickBtn('client')">
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
import {useQuizStore} from "@/store/useQuizStore";
const quizzes = ref()
const {store} = useQuizStore()
const pin = ref()
const roomPin = ref()
//todo
//сделать генерацию 8-значного пина уникального
//

function generatePin () {
    const generatedPin = Math.floor(10000000 + Math.random() * 90000000)
    pin.value = generatedPin;
}
async function onClick(id) {
    store.quizId = id
    generatePin()
    await checkPin()
    const {data, error} = await supabase
        .from('room')
        .insert([
            {pin: pin.value, quiz_id: store.quizId},
        ])
}
async function checkPin() {
    let {data: room, error} = await supabase
        .from('room')
        .select('pin')
        roomPin.value = room
    for (let i = 0; i < roomPin.value.length; i++) {
        if (pin.value === roomPin.value[i].pin) {
            pin.value = generatePin()
            console.log(false)
        }
        else {
            console.log(true)
        }
    }
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