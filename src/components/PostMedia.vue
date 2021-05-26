<template v-if="media" class="post-media">
  <a class="imgLink" :href="media.source_url">
    <img v-if="!media.sizes.medium_large" :src="media.source_url" :loading="loading"/>
    <img v-if="media.sizes.medium_large" :src="media.sizes.medium_large.source_url" :loading="loading"/>
  </a>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'PostMedia',
  props: {
    media: Object,
    lazy: Boolean
  },
  setup(props){
    
    const loading = ref(props.lazy === false ? 'eager' : 'lazy')
    
    return {loading}
  }
}
</script>

<style scoped>
  
  .imgLink {
    display: block;
    background-color: gainsboro;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
