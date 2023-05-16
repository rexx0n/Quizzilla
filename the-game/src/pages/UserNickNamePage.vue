<template>
    <div>
        <h1>Введите свое имя</h1>
        <form @submit.prevent>
            <input v-model="inputValue" type="text" placeholder="Имя">
            <p>{{someText}}</p>
        </form>

<!--            надо знать откуда пришел юзер с кнопки присоединиться или создать,либо сделать эту страницу на главной-->
            <MyButton>
                <router-link to="/join">
                Продолжить
                </router-link>
            </MyButton>


    </div>
</template>

<script setup>

import {useRouter} from "vue-router";
import {ref} from "vue";
let inputValue = ref('')
let someText = ref('')

function onRotate() {
    someText.value = ''
  if(inputValue.value.length === 0 ) {
    someText.value = 'Заполните поле'
      return false
  }
  return true
}

const router = useRouter()
router.beforeEach((to,from, next) => {
    if(onRotate()) {
        next()
    }
    else {
        next(false)
    }
})
</script>

<style scoped>

</style>