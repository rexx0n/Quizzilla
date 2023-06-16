<template>
    <div>
        <div class="table">
            <!--            показывать правильно ответил или нет-->
            <div v-if="store.isLastAnswerCorrect">
                <h1>Вы ответили правильно</h1>
                <svg width="100px" height="100px" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                    <defs></defs>
                    <path class="cls-1"
                          d="M800,510a30,30,0,1,1,30-30A30,30,0,0,1,800,510Zm-16.986-23.235a3.484,3.484,0,0,1,0-4.9l1.766-1.756a3.185,3.185,0,0,1,4.574.051l3.12,3.237a1.592,1.592,0,0,0,2.311,0l15.9-16.39a3.187,3.187,0,0,1,4.6-.027L817,468.714a3.482,3.482,0,0,1,0,4.846l-21.109,21.451a3.185,3.185,0,0,1-4.552.03Z"
                          id="check" transform="translate(-770 -450)"/>
                </svg>
            </div>
            <div v-else>
                <h1>Вы ответили неправильно</h1>
                <svg width="100px" height="100px" viewBox="0 0 72 72" id="emoji" xmlns="http://www.w3.org/2000/svg">
                    <g id="color">
                        <path fill="#ea5a47"
                              d="m58.14 21.78-7.76-8.013-14.29 14.22-14.22-14.22-8.013 8.013 14.36 14.22-14.36 14.22 8.014 8.013 14.22-14.22 14.29 14.22 7.76-8.013-14.22-14.22z"/>
                    </g>
                    <g id="hair"/>
                    <g id="skin"/>
                    <g id="skin-shadow"/>
                    <g id="line">
                        <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                              stroke-miterlimit="10" stroke-width="2"
                              d="m58.14 21.78-7.76-8.013-14.29 14.22-14.22-14.22-8.013 8.013 14.35 14.22-14.35 14.22 8.014 8.013 14.22-14.22 14.29 14.22 7.76-8.013-14.22-14.22z"/>
                    </g>
                </svg>
            </div>

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

onMounted(() => {
    //todo
    supabase.channel('table_db_changes')
        .on(
            'postgres_changes',
            {event: 'UPDATE', schema: 'public', table: 'room', filter: `id=eq.${store.room.id}`},
            (payload) => {
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
.cls-1 {
    fill: #699f4c;
    fill-rule: evenodd;
}
</style>