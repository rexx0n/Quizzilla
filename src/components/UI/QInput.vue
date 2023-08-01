<template>
    <div class="input">
        <label for="name">Введите имя</label>
        <input v-model="name" required min="1" max="10" type="text" placeholder="Имя" id="name">
    </div>
</template>

<script setup>
import {useQuizClient} from "@/composible/useQuizClient.js";

const  {store, enterName} = useQuizClient()

import {ref} from "vue";
import {useRouter} from "vue-router";

let name = ref('')
let message = ref('')
const router = useRouter()
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
.input{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
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