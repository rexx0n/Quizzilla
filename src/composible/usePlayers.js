import supabase from "@/lib/supabase";
import {computed, ref, watch} from "vue";

const players = ref([])
let roomIdRef = ref()
let channel = null

async function subscribe() {
    await unsubscribe()
    channel = supabase.channel('table_db_changes')
        .on(
            'postgres_changes',
            {event: '*', schema: 'public', table: 'players', filter: `room_id=eq.${roomIdRef.value}`},
            async (payload) => {
                await load()
            }
        )
        .subscribe()
}

async function unsubscribe() {
    if (channel) {
        await supabase.removeChannel(channel)
        channel = null
    }
}


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

function setRoomId(roomId) {
    roomIdRef.value = roomId
}

watch(roomIdRef, async (roomIdRef) => {
    await subscribe()
    await load()
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