<template>
  <div>
      <div class="table">
          <h2>{{store.room.pin}}</h2>
          <img src="@/assets/frame.png" alt="qr-code">
          <UserList @is-empty="handleCustomEvent" :room-id="store.room.id"/>
            <MyButton :class="{disabled: isEmpty}" :disabled="isEmpty" @click="toFirstRound">
                    Запустить
            </MyButton>
      </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useQuizHost} from "@/composible/useQuizHost";
import UserList from "@/components/UserList.vue";
import {useRouter} from "vue-router";
const {store} = useQuizHost()
let isEmpty = ref("")
const router = useRouter()
const handleCustomEvent = (value) => {
    isEmpty.value = value
}
async function toFirstRound() {
    await router.push({
        name: 'game',
        params: {numberQuestion: 1}
    })
}

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