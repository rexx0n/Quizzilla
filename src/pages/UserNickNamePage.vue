<template>
    <div class="container fade">
        <form @submit.prevent="onSubmit">
            <QInput></QInput>
            <QButton type="submit" >
                    Продолжить
            </QButton>
        </form>
    </div>
</template>

<script setup>
import {useQuizClient} from "@/composible/useQuizClient";
import QButton from "@/components/UI/QButton.vue";
import QInput from "@/components/UI/QInput.vue";
const  {store} = useQuizClient()



</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

</style>