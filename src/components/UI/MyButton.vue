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
    color:  white;
    font-size: 20px;
    border-radius:8px;
    padding: 10px 29px;
    border: 2px solid #E1F686;
    /*border-image-source: repeating-linear-gradient(106.49deg, #E1F686 16.01%, #91F8AA 75.98% );*/
    background: none;
}
button:hover {
    background: linear-gradient(180deg, #E2F685 0%, #8AF9AD 100%);
    color: #05030E;
}
button:active {
    transition: 2s;
    background: linear-gradient(180deg, #e2f6857a 0%, #8AF9AD 100%);
}
</style>