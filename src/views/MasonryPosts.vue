<template>
 
  <global-nav :items="globalNavItems" />

   <main>    
     
    <page-header />
    <div class="areasPage">
      
       <area-nav :items="areaNavItems" v-if="$route.name === 'Areas' || $route.name === 'Students'" />

      <template v-if="$route.name === 'Projects'">
        <loading v-if="loading" :timeout="20" />
        <projects v-else :items="items"/>
      </template>
      <template v-else>
        <loading v-if="loading" :timeout="20" />
        <posts v-else :items="items"/>
      </template>


    </div>
  </main>   
</template>

<script>
  import { ref, onBeforeMount, watch, getCurrentInstance } from "vue";
  import { useRoute } from 'vue-router'
  
  import Loading from '@/components/Loading.vue'
  import AreaNav from '@/components/AreaNav.vue'
  import Posts from '@/components/Posts.vue'
  import Projects from '@/components/Projects.vue'
  import areaNavItems from '@/router/areaNavItems.js'
  import GlobalNav from '@/components/GlobalNav.vue'  
  import {globalNavItems} from '@/router/index.js'
  import PageHeader from '@/components/PageHeader.vue'  

  export default {
    components: {
      Loading,
      GlobalNav,
      Posts,
      Projects,
      AreaNav,
      PageHeader
    },
    props: {
      post: Number
    },
    setup(props){
      const loading = ref(true)
      const items = ref()
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

        const url = `https://eoys-uploader-2021.glitch.me/api/posts`
        
        items.value = await fetch(url).then(res=>res.json())
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
    margin-top: 48px; /* <-- tentative */
  }
  
  .areasPage #areanav {
    width: 275px;
    list-style-type: none;
    margin: 0;
    text-align: left;
  }
  
  .areasPage .masonryBox {
    width: 100%;
  }

  .areasPage #areanav ~ .masonryBox {
    width: calc(100% - 275px);
  }


</style>