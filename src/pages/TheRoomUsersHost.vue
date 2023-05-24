<template>
  <div>
      <div class="table">
          <h2>{{store.room.pin}}</h2>
          <img src="@/assets/frame.png" alt="qr-code">
            <UserList/>
            <MyButton>
                <router-link to="/gameHost">
                    Создать
                </router-link>
            </MyButton>
      </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useQuizHost} from "@/composible/useQuizHost";
const {store} = useQuizHost()

let code = ref(3422)
</script>

<style scoped>
img {
    width: 150px;
}
h2 {
    color: white;
}
</style>