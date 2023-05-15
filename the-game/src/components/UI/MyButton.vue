<template>
  <div>
      <button><slot></slot></button>
  </div>
</template>

<script>
export default {
    name: "MyButton"
}
</script>

<style scoped>
button {
    max-width: 200px;
    border: none;
    border-radius:20px;
    padding: 10px;
    background: #a683e5;
}
</style>