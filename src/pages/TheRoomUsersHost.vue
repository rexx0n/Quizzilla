<template>
    <div class="container fade-in">
        <div class="table">
            <h1>Код комнаты: {{ store.room.pin }}</h1>
            <QRCodeVue3
                    :value="`${url}/Quizzilla/join/${store.room.pin}`"
                    :width="150"
                    :height="150"
                    :qrOptions="{ typeNumber: '0', mode: 'Byte', errorCorrectionLevel: 'Q' }"
                    :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
                    :dotsOptions="{ type: 'square', color: '#000000' }"
                    :cornersSquareOptions="{ type: 'square', color: '#000000' }"
            />
            <QButton :class="{disabled: isEmpty}" :disabled="isEmpty" @click="toFirstRound">
                Запустить
            </QButton>
            <UserList/>
        </div>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {useQuizHost} from "@/composible/useQuizHost";
import UserList from "@/components/UserList.vue";
import {useRouter} from "vue-router";
import QRCodeVue3 from "qrcode-vue3";
import {usePlayers} from "@/composible/usePlayers";
import QButton from "@/components/UI/QButton.vue";

const {store} = useQuizHost()
const router = useRouter()
const url = location.origin
const {setRoomId, isEmpty} = usePlayers()


async function toFirstRound() {
    await router.push({
        name: 'game',
        params: {numberQuestion: 1}
    })
}

onMounted(() => {
    setRoomId(store.room.id)
})

</script>

<style scoped>
.disabled {
    cursor: not-allowed;
}
.table {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
img {
    width: 150px;
}

button {
    margin-bottom: 20px;
}

h2 {
    color: black;
}
h1 {
    font-size: 40px;
}
@media screen and (max-width: 900px) {
    h1 {
        font-size: 30px;
    }
}
</style>