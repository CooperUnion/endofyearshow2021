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
            :author="item.author" />
        </div>
    </div>
  </div>
</template>

<script>
  import PostInfo from '@/components/PostInfo.vue'
  import PostMedia from '@/components/PostMedia.vue'

  export default {
    name: 'PostInfo',
    props: {
      tags: Array,
      title: String,
      author: Object
    },
    components: {
      TagList,
      PostInfo,
      PostMedia
    }
  }
</script>

<style scoped>

 .post-info {
    list-style-type: none;
    text-align: left;
    margin: 0;
    padding: 0;   
    font-size: 16px;
    line-height: 1;
    margin-top: 0.5em;
  }

  .post-info .titletags {
    display: flex;
    justify-content: space-between;
  }

  .post-info .title {
    color: #000;
    font-weight: 700;
    text-transform: capitalize;
    margin: 0;
  }

   .post-info .name {
    color: #000;
    margin-top: 0.25em;
  }
</style>
