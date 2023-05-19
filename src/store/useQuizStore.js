import {reactive} from "vue";

const store = reactive({
    quizId: null,
    name: null,
    pin:null,
    user:null,
})
export function useQuizStore() {

    return {
        'store':store
    }
}