<template>
    <div>
        <form action="" @submit.prevent="onJoin">
            <QInput class="label" v-model="pin" placeholder="Введите код комнаты" required min="8" max="8"
                    pattern="\d{8}" id="id"></QInput>
            <QButton type="submit">
            <p>{{ error }}</p>
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
import QInput from "@/components/UI/QInput.vue";

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
form {
    display: flex;
    flex-direction: column;
    align-items: center;
}
button {
    margin-top: 20px;
}

</style>