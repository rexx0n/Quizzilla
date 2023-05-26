import {reactive} from "vue";
import supabase from "@/lib/supabase";

const store = reactive({
    state: 'IDLE',
    room: null,
    player: null,
})

async function enterPin(pin) {
    const {data: rooms, error} = await supabase
        .from('room')
        .select('*').eq('pin', pin)
    if (rooms.length === 0) {
        return false
    }
    store.room = rooms[0]
    store.state = "ENTER NAME"
    return true
}

async function enterName(name) {
    const {data, error} = await supabase
        .from('players')
        .insert([
            {
                room_id: store.room.id,
                name: name,
                score: 0,
            }
        ]).select()
    if(error !== null) {
        return false
    }
     store.player = data[0]
    store.state = "WAITING START ROUND"
    return true
}

export function useQuizClient() {

    return {
        enterPin,
        enterName,
        store
    }
}