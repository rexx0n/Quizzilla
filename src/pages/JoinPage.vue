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
import {onMounted, ref} from "vue";
import {useQuizClient} from "@/composible/useQuizClient";
let error = ref('')
const {enterPin} = useQuizClient()
let pin = ref('')
const router = useRouter()
const props = defineProps(['pin'])
async function onJoin() {
    if (pin.value.length < 8 ) {
        error.value = 'Комната не найдена'
    }
    else if (pin.value.length > 8) {
        error.value = 'Комната не найдена'
    }
    else  {
        await join(pin.value)
    }
}
async function join(pin) {
    if (await enterPin(pin)) {
        await router.push({
            name: "username",
        })
        return
    }

    error.value = 'Комната не найдена'
}
onMounted(async () => {
    if (props.pin) {
        await join(props.pin)
    }

})
</script>

<style scoped>
p {
    color: white;
}
input[type="text"] {
    background: #B4F299;
    padding: 12px 33px;
    border-radius:8px ;
    border: none;
}
input::-webkit-input-placeholder {
    color: black;
}
input::-moz-placeholder {
    color: black;
}
</style>