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
          <b @click="loadScrim(item.id)">{{item.id}}</b>
          <b v-if="displayScrim(item.id)" @click="hideScrim()">scrim!!!</b>
          <post-media :media="item.assets.preview" />
          <post-info 
            :tags="item.taxonomy.tags"
            :title="item.title"
            :author="item.author"
            :post="item.id" />
<!--           <post-scrim 
            :media="item.assets.preview"                      
            :tags="item.taxonomy.tags"
            :title="item.title"
            :author="item.author"
            :post="item.id"/> -->
        </div>
    </div>
  </div>
</template>

<script>
  import { computed, ref, watch } from 'vue'
  import { useStore } from 'vuex'  
    
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
    },
    setup(props){
      const store = useStore()
      
      const loadScrim = (id)=> {
        store.commit('setActiveScrimId', id)
      }
      
      const hideScrim = () => {
        store.commit('resetActiveScrimId')
      }
      
      const displayScrim = (id)=>{
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
    width: calc(33% - 32px);
    width: 21vw;
/*     min-width: 266px; */
    border: 1px solid transparent;
    margin-bottom: 48px;
/*     margin: 24px; */
  }
</style>
