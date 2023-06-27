import {computed, reactive} from "vue";
import supabase from "@/lib/supabase";
import loadQuiz from "@/lib/loadQuiz";

const store = reactive({
    state: 'IDLE',
    quizId: null,
    room: null,
    quiz: null,
    question_finish_at: null,
    currentQuestionIndex: null,
    question_start_at: null,
})

async function createRoom(id) {
    store.quizId = id
     const generatedPin =  Math.floor(10000000 + Math.random() * 90000000)
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

async function startRound(questionIndex) {
    store.question_start_at = new Date()
    store.question_start_at.setSeconds(store.question_start_at.getSeconds() + 6);
    store.question_finish_at = new Date(store.question_start_at)
    store.question_finish_at.setSeconds(store.question_finish_at.getSeconds() + parseInt(import.meta.env.VITE_QUESTION_TIME));
    store.currentQuestionIndex = questionIndex
    const {data, error} = await supabase
        .from('room')
        .update({
            current_question_id: store.quiz.questions[questionIndex].id,
            question_finish_at: store.question_finish_at
        })
        .eq('id', store.room.id)
}

function isLastQuestion() {
    return store.quiz.questions.length <= store.currentQuestionIndex + 1;
}

let currentQuestion = computed(() => {
    console.log(store.currentQuestionIndex)
    if (store.quiz.questions && store.currentQuestionIndex !== null) {
        return store.quiz.questions[store.currentQuestionIndex]
    } else {
        return {}
    }
})

async function endRound() {
    let {data: player_answers, error} = await supabase
        .from('player_answers')
        .select("*")
        .eq('question_id', store.quiz.questions[store.currentQuestionIndex].id)
        .lte('created_at', store.question_finish_at.toISOString())
    const correctAnswer = store.quiz.questions[store.currentQuestionIndex].answers.find(answer => answer.correct === true)
    let {data: players} = await supabase
        .from('players')
        .select()
        .eq('room_id', store.room.id)
    for (const player of players) {
        let currentPlayer = player_answers.find((player_answer) => {
              return  player_answer.player_id === player.id
           })
        if (currentPlayer === undefined) {
            continue;
        }
        let score = Math.trunc((((store.question_finish_at - new Date( currentPlayer.created_at)) /1000) / (parseInt(import.meta.env.VITE_QUESTION_TIME) - 6))*100 + 100)
        const { data, error } = await supabase
            .from('players')//todo считать очки в зависимости от того на сколько быстро ответили
            .update({ score: currentPlayer.answer_id === correctAnswer.id ? player.score+score:player.score })
            .eq('id', player.id)
    }
}
export function useQuizHost() {

    return {
        createRoom,
        store,
        startRound,
        isLastQuestion,
        currentQuestion,
        endRound
    }
}