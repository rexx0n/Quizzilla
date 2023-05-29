<template>
  <div>
      <div class="table">
          <h2>{{store.room.pin}}</h2>
          <img src="@/assets/frame.png" alt="qr-code">
          <UserList :room-id="store.room.id"/>
            <MyButton @click="toFirstRound" >
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
const router = useRouter()
async function toFirstRound() {
    await router.push({
        name: 'game',
        params: {numberQuestion: 1}
    })
}

</script>

<style scoped>
img {
    width: 150px;
}
h2 {
    color: white;
}
</style>