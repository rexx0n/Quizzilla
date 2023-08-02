<template>
    <label :for="$attrs['id']">
        <input  :value="modelValue"  @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" type="text">
        <span>{{$attrs['placeholder']}}</span>
    </label>
</template>

<script setup>
defineOptions({
    inheritAttrs: false
})
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<style scoped>

input[type="text"] {
    background: rgb(221, 221, 221);
    border-radius: 4px;
    font-size: 20px;
    padding: 24px 33px 10px;
    border: 1px solid rgb(165, 165, 165);
    border-right: 4px solid rgb(165, 165, 165);
    border-bottom: 4px solid rgb(165, 165, 165);
    outline: none;
}

input::placeholder {
    color: black;
}


label {
    position: relative;
    border-bottom: 1px solid #ddd;
    display: inline-block;
}

input::placeholder {
    opacity: 0;
}

span {
    position: absolute;
    top: 17px;
    left: 16px;
    font-size: 20px;
    transition-duration: 300ms;
}

label:focus-within > span,
input:not(:placeholder-shown) + span {
    transform: translateY(-12px);
    font-size: 13px;
}
</style>