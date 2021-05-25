<template>
  <div class="projectsBox">
    <div class="item" v-for="item in items" v-bind:key="item.id">
      <!-- block item markup -->
        <div class="post" v-if="item.id">
          <post-media @click.prevent="loadScrim(item.id)" 
            :media="item.assets.preview" />
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
  import { useRoute } from 'vue-router'  
  import { useStore } from 'vuex'  
    
  import PostMedia from '@/components/PostMedia.vue'
  import PostScrim from '@/components/PostScrim.vue'
  
  export default {
    name: 'Projects',
    props: {
      items: Array
    },
    components: {
      PostMedia,
      PostScrim
    },
    setup(props){
      const store = useStore()
      const route = useRoute()
      
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
  .projectsBox {
    margin: 0 auto;
  }
  
  .projectsBox .post {
    margin-bottom: 36px;
  }

  .projectsBox .post >>> img {
    display: block;
    width: auto;
    height: auto;
    max-height: 600px;
  }
</style>
