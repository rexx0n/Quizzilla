<template>
    <button><slot></slot></button>
</template>

<script>
export default {
    name: "QButton",
    setup() {

        return {
        }
    }
}
</script>

<style scoped>
button {
    cursor: pointer;
    color:  black;
    font-size: 26px;
    border-radius:4px;
    padding: 15px 53px;
    border: 1px solid rgb(183, 98, 19);
    background: rgb(240, 155, 76);
    border-right: 4px solid rgb(183, 98, 19);
    border-bottom: 4px solid rgb(183, 98, 19);
}
button:hover {
    background: rgb(219 130 47);
}
button:disabled {
    opacity: 0.8;
}
button:disabled:hover {
    background: rgb(240, 155, 76);
}
button:active {
    background: rgb(190 113 42);
    transition: 200ms;
}
@media screen and (max-width: 900px) {
    button {
        font-size: 20px;
        padding: 13px 19px;
    }
}
</style>