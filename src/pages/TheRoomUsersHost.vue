<template>
  <div>
      <div class="table">
          <h1>Код комнаты</h1>
          <h2>{{code}}</h2>
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

let code = ref(3422)
</script>

<style scoped>
img {
    width: 150px;
}
</style>