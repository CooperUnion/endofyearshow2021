<template>
  
  <global-nav :items="globalNavItems" />

  <main>    
    <page-header />
    <div class="areasPage">
      
      <area-nav :items="areaNavItems" />
      
      <loading v-if="loading" :timeout="15" />
      <posts v-else :items="items"/>
      
    </div>
  </main>     
</template>

<script>
  import { ref, onBeforeMount, watch, getCurrentInstance, inject } from "vue";
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'  
  
  import Loading from '@/components/Loading.vue'
  import AreaNav from '@/components/AreaNav.vue'
  import Posts from '@/components/Posts.vue'
  import navItems from '@/router/areaNavItems.js'
  import GlobalNav from '@/components/GlobalNav.vue'  
  import {globalNavItems} from '@/router/index.js'
  import PageHeader from '@/components/PageHeader.vue'
  
  export default {
    components: {
      Loading,
      Posts,
      AreaNav,
      GlobalNav,
      PageHeader
    },
    props: {
      tag: String,
      theme: String
    },
    setup(props){
      const store = useStore()
      
      const loading = ref(true)
      const items = ref()
      const areaNavItems = ref(navItems)
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
        if(route.params.tag.split(',').length>0) {
          route.params.tag.split(',').map((tag)=>{
            store.commit('activateArea', tag)
          })
        } else {
          store.commit('activateArea', route.params.tag)
        }
        
        loading.value = true
        items.value = []
        
        const url = `${api_endpoint}/api/posts/tags/${route.params.tag}`
        
        items.value = await fetch(url).then(res=>res.json())
        loading.value = false
        // console.log(items.value)
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