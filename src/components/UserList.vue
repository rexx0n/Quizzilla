<template>
    <h1 v-if="isEmpty">Пока никого нет</h1>
    <div v-else class="players" v-for="player in players" :key="player.id">
        <p>{{ player.name }} {{ player.score }}</p>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import {usePlayers} from "@/composible/usePlayers";
const {players, isEmpty} = usePlayers()
let sortPLayers = ref()

//todo добавить анимацию передвижения пользователей вверх
watch(players,  (players) => {
    sortPLayers.value = players.sort( (a, b) => b.score - a.score)
})
onMounted( () => {

})
</script>


<style scoped>
.players {
    max-width: 700px;
    width: 100%;
    display: flex;
    border: 1px solid black;
    border-radius: 4px;
    margin: auto auto 10px;
    padding: 20px;
}

p {
    font-size: 20px;
    color: black;
}
</style>
