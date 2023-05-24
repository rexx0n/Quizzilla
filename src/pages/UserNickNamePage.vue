<template>
    <div>
        <form @submit.prevent="onSubmit">
            <label for="name">Введите имя</label>
            <input v-model="name" type="text" placeholder="Имя" id="name">
            <p>{{someText}}</p>
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
const  {store} = useQuizHost()
let name = ref('')
let someText = ref('')
const router = useRouter()
function onSubmit(){
    store.name = name
    if (store.user === 'client') {
        router.push({
            name:'join'
        })
    }
    else {
        router.push({
            name:'roomHost'
        })
    }
}


</script>

<style scoped>

</style>