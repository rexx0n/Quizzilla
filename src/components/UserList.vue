<template>
    <h1 v-if="isEmpty">Пока никого нет</h1>
    <QList v-slot="{item}" :items="players" track-by="id">
        <div class="list-item">
            <div class="user">
                <img :src="`/Quizzilla/src/assets/avatar-${players.indexOf(item)+1}.png`" alt="">
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
