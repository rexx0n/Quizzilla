<template>
    <div class="btns">
        <button>Вариант ответа1</button>
        <button class="btn--blue">Вариант ответа2</button>
        <button  class="btn--orange">Вариант ответа3</button>
        <button class="btn--green">Вариант ответа4</button>
    </div>
</template>

<script>
export default {
    name: "AnswerButtons",
    setup() {


        return {

        }
    }
}
</script>

<style scoped>
.btn--blue {
    background: deepskyblue;
}
.btn--green {
    background: lightgreen;
}
.btn--orange {
    background: orange;
}
button {
    border: none;
    background: #dcb4b4;
    padding: 10px;
}
.btns {
    max-width: 300px;
    margin: auto;
    gap: 20px;
    display: flex;
    flex-wrap: wrap;
}
</style>