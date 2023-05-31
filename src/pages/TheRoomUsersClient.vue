<template>
    <div>
        <div class="table">
            <h1>Откиньтесь на спинку и отдохните</h1>
            <UserList :room-id="store.room.id"/>
        </div>
    </div>
</template>

<script setup>

import {useQuizClient} from "@/composible/useQuizClient";
import UserList from "@/components/UserList.vue";
import {onMounted} from "vue";
import supabase from "@/lib/supabase";
import {useRouter} from "vue-router";
const router = useRouter()
const {store, startRound,loadCurrentQuiz} = useQuizClient()

onMounted(()=> {
    loadCurrentQuiz()
    supabase.channel('table_db_changes')
        .on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'room', filter: `id=eq.${store.room.id}` },
            (payload) => {
                startRound(payload.new.current_question_id, payload.new.question_finish_at)
                router.push({
                    name:"gameClient",
                })
                console.log('ROUND STARTED', payload)
            }
        )
        .subscribe()
})
</script>

<style scoped>

</style>