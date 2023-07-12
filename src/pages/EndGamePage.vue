<template>
    <div class="container">
        <Preloader v-if="!isLoad"/>
        <div v-else>
            <h1>Победители</h1>
            <div class="leaders">
                <span class="leader first">1 место {{ sortPlayers[0].name }}</span>
                <div>
                    <span class="leader second">2 место {{ sortPlayers[1].name }}</span>
                    <span class="leader third">3 место {{ sortPlayers[2].name }}</span>
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
            <MyButton @click="toMain">
                На главную
            </MyButton>
        </div>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {useQuizHost} from "@/composible/useQuizHost";
import supabase from "@/lib/supabase";
import {onMounted, ref, watch, watchEffect} from "vue";
import Preloader from '@/components/Preloader.vue'
import MyButton from "@/components/UI/MyButton.vue";

const {store} = useQuizHost()
const router = useRouter()
let sortPlayers = ref()
let losersPlayers = ref()
let isLoad = ref(false)

async function loadPlayers() {
    let {data: players, error} = await supabase
        .from('players')
        .select('score, name').eq('room_id', store.room.id).order('score')
    sortPlayers.value = players.sort((a, b) => b.score - a.score)
    losersPlayers.value = sortPlayers.value.concat()
    losersPlayers.value.splice(0, 3)
    isLoad.value = true
}

onMounted(async () => {
    await loadPlayers()
})

function toStart() {
    router.push({
        name: 'roomHost'
    })
}
function toMain() {
    router.push({
        name: 'main'
    })
}
</script>

<style scoped>
.players {
    max-width: 500px;
    padding-left: 10px;
    display: flex;
    border: 1px solid white;
    border-radius: 5px;
    margin: auto auto 10px;
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
    background: rgb(249 206 80);
    color: rgb(82, 66, 12);
}

.second {
    background: rgb(149 149 149);
    color: rgb(60 60 60);
}

.third {
    background: rgb(191 96 27);
    color: rgb(108 52 10);
}

span {
    color: white;
    font-size: 20px;
}
</style>