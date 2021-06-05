<template>
  <div 
    class="masonryBox" 
    v-masonry 
    transition-duration="0.3s" 
    item-selector=".item" 
    column-width=".item" 
    :gutter="mobile ? 18 : 48"
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
  import { getCurrentInstance } from 'vue'    
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
        return id === store.state.application.activeScrimId
      }
      
      const internalInstance = getCurrentInstance()
      const { mobile } = internalInstance.appContext.config.globalProperties
    
      return {loadScrim, displayScrim, hideScrim}
    }
  }
</script>

<style scoped>

  .masonryBox {
    width: 100%;
    margin: 0 auto;
  }
  
  .item {
    width: calc(33.33% - 32px);
  }
  
  .post {
    width: 100%;
    border: 1px solid transparent;
    margin-bottom: 48px;
  }
    
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    .item {
      width: calc(33.33% - 32px);
    }
  }  

  @media screen and (max-width: 767px) {
    .item {
      width: calc(50% - 9px);
    }
  }


</style>
