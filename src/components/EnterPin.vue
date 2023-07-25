<template>
    <div>
        <form action="" @submit.prevent="onJoin">
            <label for="pin">
                <input v-model="pin" id="pin" type="text" placeholder="Введите код комнаты" required min="8" max="8"
                       pattern="\d{8}">
                <span>Введите код комнаты</span>
            </label>
            <p>{{ error }}</p>
            <QButton type="submit">
                Присоединиться
            </QButton>
        </form>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useQuizClient} from "@/composible/useQuizClient";
import QButton from "@/components/UI/QButton.vue";

let error = ref('')
const {enterPin} = useQuizClient()
let pin = ref('')
const router = useRouter()

async function onJoin() {
    if (await enterPin(pin.value)) {
        await router.push({
            name: "username",
        })
        return
    }
    error.value = 'Комната не найдена'
    pin.value = ''
}

</script>

<style scoped>
p {
    color: white;
}
input[type="text"] {
    background: rgb(221, 221, 221);
    border-radius: 4px;
    font-size: 20px;
    padding: 24px 33px 10px;
    border: 1px solid rgb(165, 165, 165);
    border-right: 4px solid rgb(165, 165, 165);
    border-bottom: 4px solid rgb(165, 165, 165);
    outline: none;
}
button {
    margin-top: 20px;
}

input::-webkit-input-placeholder {
    color: black;
}

input::-moz-placeholder {
    color: black;
}

label {
    margin-bottom: 15px;
    position: relative;
    border-bottom: 1px solid #ddd;
}

input::placeholder {
    opacity: 0;
}

span {
    position: absolute;
    top: -11px;
    left: 16px;
    font-size: 20px;
    transition-duration: 300ms;
}

label:focus-within > span,
input:not(:placeholder-shown) + span {
    transform: translateY(-12px);
    font-size: 13px;
}
</style>