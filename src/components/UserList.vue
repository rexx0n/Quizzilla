<template>
    <h1 v-if="isEmpty">Пока никого нет</h1>
    <div v-else class="players" v-for="player in players" :key="player.id">
        <p>{{ player.name }} {{ player.score }}</p>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {usePlayers} from "@/composible/usePlayers";
const {players, isEmpty} = usePlayers()


//todo Добавить состояние что никого нет


onMounted( () => {

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.players {
    max-width: 500px;
    margin: auto;
    padding-left: 10px;
    display: flex;
    border: 1px solid white;
    border-radius: 5px;
    margin-bottom: 10px;
}

p {
    color: white;
}
</style>
