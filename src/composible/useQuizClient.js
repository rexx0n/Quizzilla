import {computed, reactive} from "vue";
import supabase from "@/lib/supabase";
import loadQuiz from "@/lib/loadQuiz";

const store = reactive({
    state: 'IDLE',
    room: null,
    player: null,
    currentQuestionId: null,
    finishAt: null,
    quiz: null,
    isLastAnswerCorrect: null,
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
function startRound(currentQuestionId, finishAt) {
   store.finishAt = new Date(finishAt)
    store.currentQuestionId = currentQuestionId
}
async function loadCurrentQuiz() {
    store.quiz = await loadQuiz(store.room.quiz_id)
}
async function sendAnswer(answer) {
    store.isLastAnswerCorrect = answer.correct
    const {data, error} = await supabase
        .from('player_answers')
        .insert([
            {player_id: store.player.id, question_id: store.currentQuestionId, answer_id: answer.id},
        ])
}
export function useQuizClient() {

    return {
        enterPin,
        enterName,
        store,
        startRound,
        loadCurrentQuiz,
        sendAnswer
    }
}