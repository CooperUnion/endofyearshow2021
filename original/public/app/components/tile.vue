<template>
  <div class="tile" :class="color">
    <h3><router-link :to="path">{{title}}</router-link></h3>
  </div>
</template>

<script>
  
  module.exports = {
    props:['url', 'title', 'color', 'slug', 'path']
  }
  
</script>

<style scoped>
  .tile {
    border: 1px solid black;
    width: var(--cell-side);
    height: var(--cell-side);
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>

