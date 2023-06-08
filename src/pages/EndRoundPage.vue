<template>
    <div>
        <div class="table">
<!--            показывать правильно ответил или нет-->
            <h1>Правильно или нет</h1>
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
const {store, startRound} = useQuizClient()

onMounted(()=> {
    //todo
    supabase.channel('table_db_changes')
        .on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'room', filter: `id=eq.${store.room.id}` },
            (payload) => {
                if (payload.old.current_question_id !== payload.new.current_question_id) {
                    startRound(payload.new.current_question_id, payload.new.question_finish_at)
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