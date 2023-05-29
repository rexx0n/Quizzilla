import {reactive} from "vue";
import supabase from "@/lib/supabase";

const store = reactive({
    state: 'IDLE',
    quizId: null,
    room: null,
    quiz: null,
})

async function createRoom(id) {
    store.quizId = id
    const generatedPin = Math.floor(10000000 + Math.random() * 90000000)
    //todo Проверить пинкод на уникальность
    const {data, error} = await supabase
        .from('room')
        .insert([
            {pin: generatedPin, quiz_id: store.quizId},
        ]).select()
    store.room = data[0]
    store.quiz = await loadQuiz(id)
    store.state = "WAITING"
}

async function loadQuiz(id) {
    let {data, error} = await supabase
        .from('quizzes')
        .select('*, questions(*, answers(*))')


        // .eq('id', id)
    return data[0]
}
async function startRound() {
    const { data, error } = await supabase
        .from('room')
        .update({ current_question_id: store.quiz.questions[0].id, question_start_at: new Date()})
        .eq('id', store.room.id)
}
export function useQuizHost() {

    return {
        createRoom,
        'store': store,
        startRound
    }
}