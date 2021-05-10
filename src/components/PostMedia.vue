<template>
  <template v-if="preview" class="post-media">
    <a :href="preview.source_url">
      <img v-if="!preview.sizes.medium_large" :src="preview.source_url" />
      <img v-if="preview.sizes.medium_large" :src="preview.sizes.medium_large.source_url" />
    </a>
  </template>
</template>

<script>
export default {
  name: 'PostMedia',
  props: {
    preview: Object
  }
}
</script>

<style scoped>
  
</style>
