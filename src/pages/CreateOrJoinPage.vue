<template>
    <div>
        <div class="main">
            <h1>The Game</h1>
            <ul>
                <li v-for="quizz in quizzes" :key="quizz.id">
<!--                    <a href=""></a>-->
                    <router-link to="/username" @click="onClick(quizz.id)">
                        {{quizz.title}}
                    </router-link>
                </li>
            </ul>
            <div class="buttons">
                    <MyButton>
                        <router-link to="/username" @click="onClickBtn('host')">
                            Создать
                        </router-link>
                    </MyButton>
                    <MyButton>
                        <router-link to="/username" @click="onClickBtn('client')">
                        Присоединиться
                        </router-link>
                    </MyButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import supabase from "@/lib/supabase";
import {onMounted, ref} from "vue";
import {useQuizStore} from "@/store/useQuizStore";
const quizzes = ref()
const {store} = useQuizStore()

function onClick(id) {
    store.quizId = id
}
function onClickBtn (hostOrClient) {
    store.user = hostOrClient
}


onMounted(async () => {
    const {data,  error} = await supabase
        .from('quizzes')
        .select()
        quizzes.value = data
})
</script>

<style scoped>

body {

}
.main {
    max-width: 500px;
    margin: auto;
}
.buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

</style>