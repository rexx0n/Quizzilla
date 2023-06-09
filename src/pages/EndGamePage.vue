<template>
    <div>
        <h1>Победители</h1>
        <div class="leaders">
            <span v-if="isLoad" class="leader first">1 место {{sortPlayers[0].name}}</span>
            <span v-else class="leader first">1 место</span>
            <div>
                <span v-if="isLoad" class="leader second">2 место {{sortPlayers[1].name}}</span>
                <span v-else class="leader second">2 место </span>
                <span v-if="isLoad" class="leader third">3 место {{sortPlayers[2].name}}</span>
                <span v-else class="leader third">3 место </span>
            </div>
        </div>
        <h1>Лузеры</h1>
<!--        <UserList></UserList>-->
        <div class="players" v-for="player in losersPlayers" :key="player.id">
            <p>{{ player.name }} {{ player.score }}</p>
        </div>
        <MyButton @click="toStart">
            Начать заново
        </MyButton>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {useQuizHost} from "@/composible/useQuizHost";
import supabase from "@/lib/supabase";
import {onMounted, ref, watch, watchEffect} from "vue";
const {store} = useQuizHost()
const router = useRouter()
let sortPlayers =ref()
let losersPlayers = ref()
let isLoad =ref(false)

async function loadPlayers() {
    let {data: players, error} = await supabase
        .from('players')
        .select('score, name' ).eq('room_id', store.room.id)
    sortPlayers.value =  players.sort((a,b) => b.score  - a.score)
    isLoad.value = true
    losersPlayers.value = sortPlayers.value.concat()
    losersPlayers.value.splice(0,3)
    losersPlayers.value.sort((a,b) => b.score - a.score)
}
onMounted(async () => {
    await loadPlayers()
})
function toStart() {
    router.push({
        name:'roomHost'
    })
}
</script>

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
.leaders {
    gap: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.leaders > div {
    display: flex;
    gap: 40px;
}
.leader {
    padding: 15px 20px;
}
.first {
    background: #e6c619f2;
}
.second {
    background: silver;
}
.third {
    background: #cd7f32;
}
span {
    color: white;
    font-size: 20px;
}
</style>