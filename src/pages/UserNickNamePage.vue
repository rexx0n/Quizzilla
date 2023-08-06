<template>
    <div class="container fade">
        <form @submit.prevent="onSubmit">
            <label for="name">Введите имя</label>
            <QInput v-model="name" required min="1" max="10" type="text" placeholder="Имя" id="name"></QInput>
            <p>{{message}}</p>
            <QButton type="submit" >
                    Продолжить
            </QButton>
        </form>
    </div>
</template>

<script setup>
import {useQuizClient} from "@/composible/useQuizClient";
import QButton from "@/components/UI/QButton.vue";
import QInput from "@/components/UI/QInput.vue";
const  {store, enterName} = useQuizClient()

import {ref} from "vue";
import {onBeforeRouteUpdate, useRouter} from "vue-router";

let name = ref('')
let message = ref('')
const router = useRouter()
window.onbeforeunload = function (e) {
    router.push({
        name: "main",
    })
}
async function onSubmit(){
    if(await enterName(name.value))  {
        await router.push({
            name: "roomClient",
        })
        return
    }
    message.value = 'Это имя уже занято, введите другое'
}


</script>

<style scoped>
p {
    color: black;
    font-size: 16px;

}
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
button{
    padding: 15px 78px;
}
label {
    font-size: 25px;
    color: black;
}
input[type="text"] {
    background:  rgb(221, 221, 221);
    padding: 12px 33px;
    border-radius:4px ;
    font-size: 17px;
    border: 1px solid black;
    text-align: center;
}
input::-webkit-input-placeholder {
    color: black;
}
input::-moz-placeholder {
    color: black;
}
</style>