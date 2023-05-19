<template>
  <div>
      <h1>Введите код</h1>
      <form action="">
          <input v-model="inputValue" type="text" placeholder="Введите код комнаты">
          <p>{{error}}</p>
      </form>

          <MyButton>
              <router-link to="/room">
              Продолжить
              </router-link>
          </MyButton>

  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
let error = ref('')
let inputValue = ref('')
const router = useRouter()

 function checkInput() {

    if(inputValue.value.length <= 2) {
          error.value = 'Вы ввели код неправильно'
        return false
    }
     return true
}


router.beforeEach((to,from, next) => {
    if (checkInput()) {
        next()
    }
    else {
        next(false)
    }
})
</script>

<style scoped>

</style>