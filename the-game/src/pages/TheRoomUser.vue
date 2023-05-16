<template>
  <div>
      <div class="table">
          <h1>{{code}}</h1>
          <img src="" alt="qr-code">
          <div class="users" v-for="user in users" :key="user.id">
              <p>{{user.name}}</p>
          </div>
      </div>

  </div>
</template>

<script setup>
//сделать две страници или одну
import {reactive, ref} from "vue";

let code = ref()
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
.users {
    display: flex;
    border: 1px solid white;
    border-radius: 5px;
}
.table {
    max-width: 500px;
    margin: auto;
}
</style>