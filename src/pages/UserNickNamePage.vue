<template>
    <div>
        <form @submit.prevent="onSubmit">
            <label for="name">Введите имя</label>
            <input v-model="name" type="text" placeholder="Имя" id="name">
            <p>{{message}}</p>
            <MyButton type="submit" >
                    Продолжить
            </MyButton>
        </form>
    </div>
</template>

<script setup>
import {useQuizHost} from "@/composible/useQuizHost";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {useQuizClient} from "@/composible/useQuizClient";
const  {store, enterName} = useQuizClient()
let name = ref('')
let message = ref('')
const router = useRouter()
async function onSubmit(){
  if(await enterName(name.value))  {
      await router.push({
          name: "roomClient",
      })
      return
  }
  message.value = 'Это имя уже занято, введите другое'
}


</script>

<style scoped>

</style>