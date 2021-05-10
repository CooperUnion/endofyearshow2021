<template v-if="media" class="post-media">
  <a :href="media.source_url">
    <img v-if="!media.sizes.medium_large" :src="media.source_url" />
    <img v-if="media.sizes.medium_large" :src="media.sizes.medium_large.source_url" />
  </a>
</template>

<script>
export default {
  name: 'PostMedia',
  props: {
    media: Object
  }
}
</script>

<style scoped>
  
  .post-media a {
    display: block;
    background-color: gainsboro;
  }

  .post-media a img {
    display: block;
    width: 100%;
  }
</style>
