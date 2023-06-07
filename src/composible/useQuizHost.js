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
})

async function createRoom(id) {
    store.quizId = id
    const generatedPin = 76947819 //Math.floor(10000000 + Math.random() * 90000000)
    //todo Проверить пинкод на уникальность
    // const {data, error} = await supabase
    //     .from('room')
    //     .insert([
    //         {pin: generatedPin, quiz_id: store.quizId},
    //     ]).select()
    const {data, error} = await supabase
        .from('room')
        .select().eq('pin', generatedPin)
    store.room = data[0]
    store.quiz = await loadQuiz(id)
    store.state = "WAITING"
}

async function startRound(questionIndex) {
    store.question_finish_at = new Date();
    store.question_finish_at.setSeconds(store.question_finish_at.getSeconds() + 2);
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
    //todo вычитать ответы из PlayerAnswers и обновить в scorePlayers
    let {data: player_answers, error} = await supabase
        .from('player_answers')
        .select("*")
        .eq('question_id', store.quiz.questions[store.currentQuestionIndex].id)
        // .lte('created_at', store.question_finish_at.toString())
    const correctAnswer = store.quiz.questions[store.currentQuestionIndex].answers.find(answer => answer.correct === true)
    let {data: players} = await supabase
        .from('players')
        .select()
        .eq('room_id', store.room.id)
    console.log(correctAnswer.id)
    console.log(player_answers)
    console.log(players)
    // с players взять Id пойти в player_answers найти по плэйер айди взять answers_id и проверить по айди с correctAnswer
    players.forEach((player) => {
        
player.scopre = isCorrect ? payer.score+100:player.score
    })


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