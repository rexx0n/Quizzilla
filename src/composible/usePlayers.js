import supabase from "@/lib/supabase";
import {computed, reactive, ref, watch} from "vue";

const players = ref([])
let roomIdRef = ref()

async function load() {
    if (!roomIdRef.value) {
        return
    }
    let {data, error} = await supabase
        .from('players')
        .select()
        .eq('room_id', roomIdRef.value)
    players.value = data
}

supabase.channel('table_db_changes')
    .on(
        'postgres_changes',
        {event: 'INSERT', schema: 'public', table: 'players'},
        (payload) => {
            load()
        }
    )
    .subscribe()

function setRoomId(roomId) {
    roomIdRef.value = roomId
    console.log('setRoomId')
}

watch(roomIdRef, (roomIdRef) => {
    load()
    console.log(roomIdRef)
})
let isEmpty = computed(() => {
    return players.value.length === 0;
})

export function usePlayers() {

    return {
        roomIdRef,
        players,
        setRoomId,
        isEmpty,
    }
}