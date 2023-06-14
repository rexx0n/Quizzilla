<template>
    <button><slot></slot></button>
</template>

<script>
import {reactive, ref} from "vue";

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
    color:  black;
    font-size: 20px;
    border-radius:4px;
    padding: 10px 29px;
    border: 1px solid black;
    background: rgb(240, 155, 76);
    border-right: 4px solid black;
    border-bottom: 4px solid black;
}
button:hover {
    opacity: .6;
}
button:active {

}
</style>