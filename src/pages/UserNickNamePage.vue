<template>
    <div class="container">
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
    color: black;
}
.container {
    animation-duration: 1s;
    animation-name: opacity;
}
@keyframes opacity {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
input[type="text"] {
    background:  rgb(221, 221, 221);
    padding: 12px 33px;
    border-radius:4px ;
    font-size: 17px;
    border: 1px solid black;
    text-align: center;
}
input::-webkit-input-placeholder {
    color: black;
}
input::-moz-placeholder {
    color: black;
}
label {
    font-size: 25px;
    color: black;
}
.input{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}
</style>