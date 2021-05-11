<template>
  <div 
    class="masonryBox" 
    v-masonry 
    transition-duration="0.3s" 
    item-selector=".item" 
    column-width=".post" 
    gutter="48" 

    horizontal-order="true">
    <div v-masonry-tile class="item" v-for="item in items" v-bind:key="item.id">
      <!-- block item markup -->
        <div class="post" v-if="item.id">
          <post-media :media="item.assets.preview" />
          <post-info 
            :tags="item.taxonomy.tags"
            :title="item.title"
            :author="item.author"
            :post="item.id" />
        </div>
    </div>
  </div>
</template>

<script>
  import PostInfo from '@/components/PostInfo.vue'
  import PostMedia from '@/components/PostMedia.vue'

  export default {
    name: 'Posts',
    props: {
      items: Array
    },
    components: {
      PostInfo,
      PostMedia
    }
  }
</script>

<style scoped>

  .masonryBox {
    margin: 0 auto;
  }
  
  .post {
    width: calc(33% - 32px);
    width: 21vw;
/*     min-width: 266px; */
    border: 1px solid transparent;
    margin-bottom: 48px;
/*     margin: 24px; */
  }
</style>
