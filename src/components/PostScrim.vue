<template>
  <a :href="media.source_url">
    <img v-if="!media.sizes.medium_large" :src="media.source_url" />
    <img v-if="media.sizes.medium_large" :src="media.sizes.medium_large.source_url" />
  </a>

</template>

<script>
  export default {
    name: 'PostScrim',
  }
</script>

<style scoped>
</style>
