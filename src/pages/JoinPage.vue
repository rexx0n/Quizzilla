<template>

</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useQuizClient} from "@/composible/useQuizClient";

const {enterPin} = useQuizClient()
const router = useRouter()
const props = defineProps({'pin': {required: true}})

async function join(pin) {
    if (await enterPin(pin)) {
        await router.push({
            name: "username",
        })
    } else {
        await router.push({
            name: 'notFound'
        })
    }
}

onMounted(async () => {
    await join(props.pin)
})
</script>

<style scoped>

</style>