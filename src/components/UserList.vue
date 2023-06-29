<template>
    <h1 v-if="isEmpty">Пока никого нет</h1>
    <div v-else class="players" v-for="player in sortPLayers" :key="player.id">
        <p>{{ player.name }} {{ player.score }}</p>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import {usePlayers} from "@/composible/usePlayers";
const {players, isEmpty} = usePlayers()
let sortPLayers = ref()


watch(players,  (players) => {
    sortPLayers.value = players.sort( (a, b) => b.score - a.score)
})
onMounted( () => {

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.players {
    max-width: 500px;
    padding-left: 10px;
    display: flex;
    border: 1px solid black;
    border-radius: 4px;
    margin: auto auto 10px;
}

p {
    color: black;
}
</style>
