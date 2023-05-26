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

const {store} = useQuizClient()

</script>

<style scoped>

</style>