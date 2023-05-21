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
    max-width: 200px;
    border: none;
    color: #8ab4f8;
    font-size: 20px;
    border-radius:20px;
    padding: 10px;
    background:#202124;

}
button:hover {
    background: #8ab4f814;
}
button:active {
    transition: 0.4s;
    background: #8ab4f869;
}
</style>