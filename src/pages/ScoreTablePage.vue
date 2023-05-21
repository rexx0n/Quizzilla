<template>
    <div>
        <UserList></UserList>
        <MyButton @click="toNext">Следующий вопрос</MyButton>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
function toNext() {
    router.push({
        name:'game'
    })
}

</script>

<style scoped>

</style>