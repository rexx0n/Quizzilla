<template>
        <TransitionGroup name="list" tag="ul">
            <li v-for="item in props.items" :key="item[props.trackBy]">
                <slot :item="item"></slot>
            </li>
        </TransitionGroup>
</template>

<script setup>
let props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    trackBy: {
        type: String,
        default: 'id'
    }
})

</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}
li {
    max-width: 700px;
    width: 100%;
    list-style-type: none;
    border: 1px solid rgb(165, 165, 165);
    border-bottom:4px solid rgb(165, 165, 165);
    border-right: 4px solid rgb(165, 165, 165);
    border-radius: 4px;
    margin: auto auto 10px;
    font-size: 20px;
    padding: 10px;
}
@media screen and (max-width: 900px) {
    li {
        font-size: 16px;
        padding: 15px;
    }
}
</style>