<template>
  <section class="categories">
    <tile 
      v-for="category in categories" 
      :url="category.url" 
      :title="category.name"
      :slug="category.slug"
      :path="category.path"
    />
  </section>
</template>

<script>
  const Tile = httpVueLoader('/components/tile.vue')
  
  module.exports = {
    props: ['categories'],
    components: {
      Tile
    }  
  }  
  
</script>
<style scoped>
  section {
    border:var(--debug);
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--column-gap);
    padding-top: var(--column-gap);
  }
</style>
  
