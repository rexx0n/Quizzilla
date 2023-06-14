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
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
#app {
    font-family: IBM Plex Mono,monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
h1 {
    color: black;
}
body {
    background: white;
}
.container {
    max-width: 900px;
    margin: auto;
}
a {
    text-decoration: none;
    color: black;
}
</style>
