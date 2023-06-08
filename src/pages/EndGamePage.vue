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
        <UserList></UserList>
        <MyButton @click="toStart">
            Начать заново
        </MyButton>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {useQuizHost} from "@/composible/useQuizHost";
import supabase from "@/lib/supabase";
import {onMounted, ref} from "vue";
const {store} = useQuizHost()
const router = useRouter()
let sortPlayers =ref()
let isLoad =ref(false)

async function loadPlayers() {
    let {data: players, error} = await supabase
        .from('players')
        .select('score, name' ).eq('room_id', store.room.id)
    sortPlayers.value =  players.sort((a,b) => b.score  - a.score)
    isLoad.value = true
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
.preloader {
    margin: auto;
}

.preloader__row {
    position: relative;
    top: 50%;
    left: 50%;
    width: 70px;
    height: 70px;
    margin-top: -35px;
    margin-left: -35px;
    text-align: center;
    animation: preloader-rotate 2s infinite linear;
}

.preloader__item {
    position: absolute;
    display: inline-block;
    top: 0;
    background-color: #337ab7;
    border-radius: 100%;
    width: 35px;
    height: 35px;
    animation: preloader-bounce 2s infinite ease-in-out;
}

.preloader__item:last-child {
    top: auto;
    bottom: 0;
    animation-delay: -1s;
}

@keyframes preloader-rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes preloader-bounce {

    0%,
    100% {
        transform: scale(0);
    }

    50% {
        transform: scale(1);
    }
}

.loaded_hiding .preloader {
    transition: 0.3s opacity;
    opacity: 0;
}

.loaded .preloader {
    display: none;
}
</style>