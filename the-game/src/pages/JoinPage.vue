<template>
    <div>
        <div class="main">
            <h1>The Game</h1>
            <div class="buttons">
                <MyButton>Создать</MyButton>
                <MyButton>Присоединиться</MyButton>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
body {

}
.main {
    max-width: 500px;
    margin: auto;
}
.buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

</style>