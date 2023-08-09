<template>
    <h1 v-if="isEmpty">Пока никого нет</h1>
    <QList v-slot="{item}" :items="players" track-by="id">
        <div class="list-item">
            <div class="user">
                <img src="../assets/avatar.png" alt="">
                <span>{{ item.name }}</span>
            </div>
            <div>
                {{ item.score }}
            </div>
        </div>
    </QList>
</template>

<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import {usePlayers} from "@/composible/usePlayers";
import QList from "@/components/UI/QList.vue";

const {players, isEmpty} = usePlayers()
let sortPLayers = ref()
let count = ref(0)
let imageList = ref([
    '/Quizzilla/src/assets/avatar.png',
    '/Quizzilla/src/assets/avatar-2.png',
    '/Quizzilla/src/assets/avatar-3.png',
    '/Quizzilla/src/assets/avatar-4.png',
    '/Quizzilla/src/assets/avatar-5.png',
    '/Quizzilla/src/assets/avatar-6.png',
    '/Quizzilla/src/assets/avatar-7.png',
    '/Quizzilla/src/assets/avatar-8.png',
])
watch(players, (players) => {
    sortPLayers.value = players.sort((a, b) => b.score - a.score)
})
onMounted(() => {

})
</script>


<style scoped>
.list-item {
    display: flex;
    justify-content: space-between;
}
ul {
    width: 100%;
}
.user {
    position: relative;
}
img {
    width: 40px;
    position: absolute;
    top: -14px;
}
span{
    padding-left: 65px;
}
</style>
