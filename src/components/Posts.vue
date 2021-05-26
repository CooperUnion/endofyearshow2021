<template>
  <div 
    class="masonryBox" 
    v-masonry 
    transition-duration="0.3s" 
    item-selector=".item" 
    column-width=".post" 
    gutter="48"

    horizontal-order="true">
    <div v-masonry-tile class="item" v-for="(item, index) in items" v-bind:key="item.id">
      <!-- block item markup -->
        <div class="post" v-if="item.id">
          <post-media @click.prevent="loadScrim(item.id)" 
            :media="item.assets.preview" :lazy="index>15"/>
          <post-info
            :tags="item.taxonomy.tags"
            :title="item.title"
            :author="item.author"
            :post="item.id" />
          <post-scrim v-if="displayScrim(item.id)"
            :tags="item.taxonomy.tags"
            :title="item.title"
            :author="item.author"
            :assets="item.assets"
            :meta="item.meta"
            :post="item.id"
            :type="item.type"/>
        </div>
    </div>
  </div>
</template>

<script>
  import { computed, ref, watch } from 'vue'
  import { useStore } from 'vuex'  
    
  import PostInfo from '@/components/PostInfo.vue'
  import PostMedia from '@/components/PostMedia.vue'
  import PostScrim from '@/components/PostScrim.vue'
  
  export default {
    name: 'Posts',
    props: {
      items: Array
    },
    components: {
      PostInfo,
      PostMedia,
      PostScrim
    },
    setup(props){
      const store = useStore()
      
      const loadScrim = (id) => {
        store.commit('setActiveScrimId', id)
      }
      
      const hideScrim = () => {
        store.commit('resetActiveScrimId')
      }
      
      const displayScrim = (id) => {
        return id === store.state.activeScrimId
      }
      
      return {loadScrim, displayScrim, hideScrim}
    }
  }
</script>

<style scoped>

  .masonryBox {
    margin: 0 auto;
  }
  
  .post {
    width: 17vw;
/*     min-width: 266px; */
    border: 1px solid transparent;
    margin-bottom: 48px;
/*     margin: 24px; */
  }
  
    @media screen and (max-width: 767px) {
    .post {
      width: calc(50vw - 48px - 9px);
    }
  }  


</style>
