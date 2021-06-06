<template>
  <global-nav :items="globalNavItems" />
   <main>    
    <page-header />
    <div class="areasPage">
      
      <area-nav :items="areaNavItems" />
      
      <loading v-if="loading" :timeout="15" />
      <posts v-else :items="items"/>
      
    </div>
<<<<<<< HEAD:src/views/MasonryPost.vue
  </main>  

<newcursors/>

=======
  </main>   
	<global-footer :items="globalNavItems" />
>>>>>>> v0.4.1:src/views/DO NOT USE MasonryPost.vue
</template>

<script>
  import { ref, onBeforeMount, watch, getCurrentInstance } from "vue";
  import { useRoute } from 'vue-router'
  
  import newcursors from '@/components/Cursors-attempt-rightvue.vue'
  import Loading from '@/components/Loading.vue'
  import AreaNav from '@/components/AreaNav.vue'
  import Posts from '@/components/Posts.vue'
  import areaNavItems from '@/router/areaNavItems.js'
  import GlobalNav from '@/components/GlobalNav.vue'  
  import {globalNavItems} from '@/router/index.js'
  import GlobalFooter from '@/components/GlobalFooter.vue'  
  
  export default {
    components: {
      newcursors,
      Loading,
      GlobalNav,
      Posts,
      AreaNav,
      GlobalFooter
    },
    props: {
      post: Number
    },
    setup(props){
      const loading = ref(true)
      const items = ref()
      const areaNavItems = ref(areaNavItems)
      const route = useRoute()
      const internalInstance = getCurrentInstance()
      const { api_endpoint } = internalInstance.appContext.config.globalProperties
         
      onBeforeMount(loadPosts)
      async function loadToggle(){
        console.log("ok...")
        loading.value = loading.value === true ? false : true
      }
      
      watch(() => route.params.tag, loadPosts)    
      
      async function loadPosts(){
        loading.value = true
        items.value = []

        const url = `${api_endpoint}/api/posts/${route.params.post}`
        
        items.value = [await fetch(url).then(res=>res.json())]
        loading.value = false
        console.log(items.value)
        return true
      }
      return {items, loading, loadToggle, loadPosts, areaNavItems, globalNavItems}
    }
  }
</script>

<style scoped>
  
  .areasPage {
    display: flex;
    flex-direction: row;
    padding-top: 48px; /* <-- tentative */
  }
    
  @media screen and (max-width: 767px) {
    .areasPage {
      flex-direction: column;
      position: relative;
    }
  }


</style>