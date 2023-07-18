<template>
    <button><slot></slot></button>
</template>

<script>
export default {
    name: "MyButton",
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
    border: 1px solid black;
    background: rgb(240, 155, 76);
    border-right: 4px solid black;
    border-bottom: 4px solid black;
}
button:hover {
    background: rgb(219 130 47);
}
button:disabled {
    opacity: 0.8;
}
button:active {
    background: rgb(190 113 42);
    transition: 200ms;
}
</style>