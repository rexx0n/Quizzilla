import supabase from "@/lib/supabase";

export default async function loadQuiz(id) {
    let {data, error} = await supabase
        .from('quizzes')
        .select('*, questions(*, answers(*))')
        .eq('id', id)
    return data[0]
}