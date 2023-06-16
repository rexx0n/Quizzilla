<template>
    <div>
        <div class="table">
            <h1>Откиньтесь на спинку и отдохните</h1>
            <UserList/>
        </div>
    </div>
</template>

<script setup>

import {useQuizClient} from "@/composible/useQuizClient";
import UserList from "@/components/UserList.vue";
import {onMounted} from "vue";
import supabase from "@/lib/supabase";
import {useRouter} from "vue-router";
import {usePlayers} from "@/composible/usePlayers";

const {setRoomId} = usePlayers()
const router = useRouter()
const {store, startRound,loadCurrentQuiz} = useQuizClient()

onMounted(()=> {
    loadCurrentQuiz()
    setRoomId(store.room.id)
    //todo
    supabase.channel('table_db_changes_room')
        .on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'room', filter: `id=eq.${store.room.id}` },
            (payload) => {
                console.log('paylod',payload)
                if (payload.old.current_question_id !== payload.new.current_question_id) {
                    startRound(payload.new.current_question_id, payload.new.question_start_at,payload.new.question_finish_at)
                    router.push({
                        name: "gameClient",
                    })
                }
            }
        )
        .subscribe()
})
</script>

<style scoped>

</style>