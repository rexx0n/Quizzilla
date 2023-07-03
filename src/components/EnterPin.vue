<template>
  <div>
      <form action="" @submit.prevent="onJoin">
          <input v-model="pin" type="text" placeholder="Введите код комнаты" required min="8" max="8" pattern="\d{8}">
          <p>{{error}}</p>
          <MyButton type="submit" >
              Присоединиться
          </MyButton>
      </form>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useQuizClient} from "@/composible/useQuizClient";
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
    padding: 12px 33px;
    border-radius:4px ;
    font-size: 17px;
    border: 1px solid black;
}
input::-webkit-input-placeholder {
    color: black;
}
input::-moz-placeholder {
    color: black;
}
</style>