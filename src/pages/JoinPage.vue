<template>
  <div>
      <h1>Введите код</h1>
      <form action="">
          <input v-model="pin" type="text" placeholder="Введите код комнаты">
          <p>{{error}}</p>
      </form>
          <MyButton @click="onJoin">
              Присоединиться
          </MyButton>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
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
}
</script>

<style scoped>

</style>