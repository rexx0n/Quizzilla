<template>
  <div>
      <div class="table">
          <h2>{{store.room.pin}}</h2>
          <QRCodeVue3 :value="`${url}/join/${store.room.pin}`" />
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
onMounted(()=> {
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
    color: white;
}
</style>