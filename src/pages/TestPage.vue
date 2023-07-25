<template>
    <QList v-slot="{item}" :items="items" key="name">{{item.name}} {{item.score}}</QList>
    <button @click="shuffle" >sadasda</button>
</template>

<script setup>
import QList from "@/components/UI/QList.vue";
import {ref} from "vue";

let items = ref([{name: 'asda', score: 1231,}, {name: 'asda', score: 12,},{name: 'dfgfd', score: 412,}])

function shuffle () {
    items.value = [{name: 'asda', score: 12,},{name: 'dfgfd', score: 412,}, {name: 'asda', score: 1231,}]
}
</script>

<style scoped>

</style>