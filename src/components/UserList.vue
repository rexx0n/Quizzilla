<template>
    <h1 v-if="isEmpty">Пока никого нет</h1>
    <QList v-slot="{item}" :items="players" key="id">
        <div class="list-item">
            <div>
                {{ item.name }}
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

//todo добавить анимацию передвижения пользователей вверх
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
</style>
