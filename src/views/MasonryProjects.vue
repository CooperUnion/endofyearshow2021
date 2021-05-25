<template>
 
  <global-nav :items="globalNavItems" />

   <main>    
    <page-header v-if="!$route.name === 'Projects'" />
    <div class="areasPage">

      <loading v-if="loading" :timeout="20" />
      <project v-else :items="items"/>

    </div>
  </main>   
</template>

<script>
  import { ref, onBeforeMount, watch, getCurrentInstance } from "vue";
  import { useRoute } from 'vue-router'
  
  import Loading from '@/components/Loading.vue'
  import Project from '@/components/Project.vue'
  import GlobalNav from '@/components/GlobalNav.vue'  
  import {globalNavItems} from '@/router/index.js'
  import PageHeader from '@/components/PageHeader.vue'  

  export default {
    components: {
      Loading,
      GlobalNav,
      Project,
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
      
      watch(() => route.params.project, loadProject)    
      
      async function loadProject(){
        loading.value = true
        items.value = []

        const url = `${api_endpoint}/api/posts`
        
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