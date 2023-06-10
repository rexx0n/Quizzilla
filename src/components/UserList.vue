<template>
    <h1 v-if="isEmpty">Пока никого нет</h1>
    <div v-else class="players" v-for="player in players" :key="player.id">
        <p>{{ player.name }} {{ player.score }}</p>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import supabase from "@/lib/supabase";
let isEmpty = ref()
let players = ref([])
const props = defineProps({
    'roomId': {
        required: true,
        type: Number
    }
})
const emit = defineEmits(['isEmpty'])

//todo Добавить состояние что никого нет
function isEmptyList() {
    return players.value.length === 0;
}
const handleClick = () => {
    emit('isEmpty', isEmpty.value)
}
setInterval(()=> {
    isEmptyList()
    isEmpty.value = isEmptyList()
    handleClick()
}, 500)
console.log(isEmptyList())
async function load() {
    let {data, error} = await supabase
        .from('players')
        .select()
        .eq('room_id', props.roomId)
    players.value = data
}

onMounted(async () => {
    supabase.channel('table_db_changes')
        .on(
            'postgres_changes',
            {event: 'INSERT', schema: 'public', table: 'players'},
            (payload) => {
                load()
            }
        )
        .subscribe()
    await load()
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
