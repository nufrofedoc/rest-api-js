<template>
  <div class="loader">
    <div class="spinner-border spinner-border-sm" role="status">
      <span class="sr-only"></span>
    </div>
    <div class="spinner-grow spinner-grow-sm" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
