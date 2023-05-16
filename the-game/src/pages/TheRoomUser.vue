<template>
  <div>
      <div class="table">
          <h1>Код комнаты</h1>
          <h2>{{code}}</h2>
          <img src="../assets/frame.png" alt="qr-code">
          <h1>Таблица игроков</h1>
          <div class="users" v-for="user in users" :key="user.id">
              <p>{{user.name}}</p>
          </div>
      </div>

  </div>
</template>

<script setup>
//сделать две страници или одну
import {reactive, ref} from "vue";

let code = ref(3422)
let users = reactive([
    {
    id:1,
      name:'rexxon',
    },
    {
        id:2,
        name:'kalex',
    },
    {
        id:3,
        name:'dethrone'
    },
])
</script>

<style scoped>
img {
    width: 150px;
}
.users {
    padding-left: 10px;
    display: flex;
    border: 1px solid white;
    border-radius: 5px;
}
.table {
    max-width: 500px;
    margin: auto;
}
</style>