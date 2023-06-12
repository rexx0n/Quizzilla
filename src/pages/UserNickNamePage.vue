<template>
    <div>
        <form @submit.prevent="onSubmit">
            <div class="input">
                <label for="name">Введите имя</label>
                <input v-model="name" type="text" placeholder="Имя" id="name">
            </div>
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
label {
    color: white;
}
.input{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}
</style>