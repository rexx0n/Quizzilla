<template>
    <div class="container">
        <div class="table">
            <h2>Код комнаты: {{ store.room.pin }}</h2>
            <QRCodeVue3
                    :value="`${url}/join/${store.room.pin}`"
                    :width="150"
                    :height="150"
                    :qrOptions="{ typeNumber: '0', mode: 'Byte', errorCorrectionLevel: 'Q' }"
                    :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
                    :dotsOptions="{ type: 'square', color: '#000000' }"
                    :cornersSquareOptions="{ type: 'square', color: '#000000' }"
            />
            <UserList/>
            <MyButton :class="{disabled: isEmpty}" :disabled="isEmpty" @click="toFirstRound">
                Запустить
            </MyButton>
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

img {
    width: 150px;
}

h2 {
    color: black;
}
</style>