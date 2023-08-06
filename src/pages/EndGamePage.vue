<template>
    <div class="container fade-in">
        <Preloader v-if="!isLoad"/>
        <div class="main" v-else>
            <h1>Победители</h1>
            <div class="leaders">
                <span class="leader first">1 место {{ sortPlayers[0].name || '' }}</span>
                <div>
                    <span v-if="!!sortPlayers[1]" class="leader second">2 место {{ sortPlayers[1].name || '' }}</span>
                    <span v-if="!!sortPlayers[2]" class="leader third">3 место {{ sortPlayers[2].name || '' }}</span>
                </div>
            </div>
            <div class="btns">
                <QButton @click="toStart">
                    Начать заново
                </QButton>
                <QButton @click="toMain">
                    На главную
                </QButton>
            </div>
            <h1 class="losers">Лузеры</h1>
            <!--        <UserList></UserList>-->
            <div class="players" v-for="player in losersPlayers" :key="player.id">
                <p>{{ player.name }} {{ player.score }}</p>
            </div>

        </div>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {useQuizHost} from "@/composible/useQuizHost";
import supabase from "@/lib/supabase";
import {onMounted, ref, watch, watchEffect} from "vue";
import Preloader from '@/components/Preloader.vue'
import QButton from "@/components/UI/QButton.vue";
//todo показывать у клиента на каком он месте
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
h1 {
    font-size: 50px;
    margin-bottom: 20px;
}

.main {
    position: relative;
}
.players {
    max-width: 700px;
    width: 100%;
    display: flex;
    border: 1px solid black;
    border-radius: 4px;
    margin: auto auto 10px;
    padding: 20px;
}

.losers {
    margin-top: 20px;
}
.btns {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
p {
    color: black;
    font-size: 20px;
}

.leaders {
    gap: 34px;
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
    padding: 16px 26px;
}

.first {
    background: rgb(249 206 80);
    color: rgb(82, 66, 12);
    border: 1px solid rgb(206 165 21);
    animation-duration: 2s;
    animation-name: radiance;
    animation-iteration-count: infinite;
}

.second {
    background: rgb(149 149 149);
    color: rgb(60 60 60);
}

.third {
    background: rgb(191 96 27);
    color: rgb(108 52 10);
}

button {
    margin: 5px;
}

span {
    color: white;
    font-size: 40px;
    border-radius: 4px;
    border: 1px solid;
}
@keyframes radiance {
    0% {
        box-shadow: 1px 1px 10px 4px rgb(249 206 80);
    }
    50% {
        box-shadow: 1px 1px 17px 10px rgb(249 206 80);
    }
    100% {
        box-shadow: 1px 1px 10px 4px rgb(249 206 80);
    }
}
</style>