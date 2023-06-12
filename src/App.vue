<template>
    <router-view></router-view>
</template>

<script setup>
import {useQuizClient} from "@/composible/useQuizClient";
import {useQuizHost} from "@/composible/useQuizHost";

const {store} = useQuizClient()
const {store:storeHost} = useQuizHost()
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
h1 {
    color: white;
}
body {
    background: #05030E url("assets/background.png") no-repeat;
}
.container {
    max-width: 900px;
    margin: auto;
}
a {
    text-decoration: none;
    color: white;
}
</style>
