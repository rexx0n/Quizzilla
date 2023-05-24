import {reactive} from "vue";
import supabase from "@/lib/supabase";

const store = reactive({
    state: 'IDLE',
    quizId:null,
    room: null,
})
async function createRoom(id) {
    store.quizId = id
    const generatedPin = Math.floor(10000000 + Math.random() * 90000000)
    //todo Проверить пинкод на уникальность
    const {data,error} = await supabase
        .from('room')
        .insert([
            {pin: generatedPin, quiz_id: store.quizId},
        ]).select()
        store.room = data[0]
        store.state= "WAITING"
}
export function useQuizHost() {

    return {
        createRoom,
        'store':store
    }
}