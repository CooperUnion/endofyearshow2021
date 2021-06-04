<template>
 
  <global-nav :items="globalNavItems" />

   <main>    
    <page-header />
    <div class="areasPage">
      <area-nav :items="areaNavItems" v-if="$route.name === 'Areas' || $route.name === 'Students'" />
      <loading v-if="loading" :timeout="20" />
      <posts v-else :items="items"/>
    </div>
  </main>   
	<global-footer :items="globalNavItems" />
</template>

<script>
  import { ref, onBeforeMount, watch, getCurrentInstance } from "vue";
  import { useRoute } from 'vue-router'
  
  import Loading from '@/components/Loading.vue'
  import AreaNav from '@/components/AreaNav.vue'
  import Posts from '@/components/Posts.vue'
  import areaNavItems from '@/router/areaNavItems.js'
  import GlobalNav from '@/components/GlobalNav.vue'  
  import {globalNavItems} from '@/router/index.js'
  import PageHeader from '@/components/PageHeader.vue'
	import GlobalFooter from '@/components/GlobalFooter.vue' 

  export default {
    components: {
      Loading,
      GlobalNav,
      Posts,
      AreaNav,
      PageHeader,
      GlobalFooter
    },
    props: {
      post: Number,
      postsEndpoint: String
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

        const url = (props.postsEndpoint) 
          ? `${api_endpoint}/api/posts${props.postsEndpoint}`
          : `${api_endpoint}/api/posts`
        
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
    padding-top: 48px; /* <-- tentative */
  }
    
  @media screen and (max-width: 767px) {
    .areasPage {
      flex-direction: column;
      position: relative;
      margin: 0;
    }
  }

</style>