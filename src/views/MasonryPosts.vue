<template>
 <global-header />
   <main>
    <div class="areasPage">
      <area-nav :items="areaNavItems" v-if="['Areas','Area','Students'].includes($route.name)" />
      <loading v-if="loading" :timeout="20" />
      <posts v-else :items="items"/>
    </div>
    <loading v-if="loadingRemainder" :timeout="20" />
  </main>   
	<global-footer :items="globalNavItems" />
</template>

<script>
  import { ref, onBeforeMount, onMounted, watch, getCurrentInstance } from "vue";
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'  

  import Loading from '@/components/Loading.vue'
  import AreaNav from '@/components/AreaNav.vue'
  import Posts from '@/components/Posts.vue'
  import {globalNavItems} from '@/router/index.js'
  import navItems from '@/router/areaNavItems.js'
	import GlobalHeader from '@/components/GlobalHeader.vue' 
	import GlobalFooter from '@/components/GlobalFooter.vue' 


  export default {
    components: {
      Loading,
      Posts,
      AreaNav,
      GlobalHeader,
      GlobalFooter  
    },
    props: {
      post: Number,
      postsEndpointSuffix: String,
      tag: String,
      theme: String
    },
    setup(props){
      const store = useStore()

      const loading = ref(true)
      const loadingRemainder = ref(false)
      const items = ref()
      const areaNavItems = ref(navItems)
      const route = useRoute()
      const internalInstance = getCurrentInstance()
      const { api_endpoint } = internalInstance.appContext.config.globalProperties
         
      onMounted(loadPosts)
      
      watch(() => route.params.tag, loadPosts)    
            
      async function loadPosts(){
        try {
          // Handle when filtering for a tag
          if(route.params.tag.split(',').length>0) {
            route.params.tag.split(',').map((tag)=>{
              store.commit('activateArea', tag)
            })
          } else {
            store.commit('activateArea', route.params.tag)
          }
        } catch(e) {
          // Not filtering by a tag
        }

        loading.value = true
        items.value = []

        const url = (props.postsEndpointSuffix) 
          ? `${api_endpoint}/api/posts/${props.postsEndpointSuffix}`
          : `${api_endpoint}/api/posts`
        const query = `?limit=15`
        const urlQuery = url+query

        items.value = await fetch(urlQuery).then(res=>res.json())
        loading.value = false
        loadRemainder()
        return true
      }

      function loadRemainder() {
        loadingRemainder.value = true
        const url = (props.postsEndpointSuffix) 
          ? `${api_endpoint}/api/posts/${props.postsEndpointSuffix}`
          : `${api_endpoint}/api/posts`
        const query = `?limit=1000&offset=20`
        const urlQuery = url+query

        fetch(urlQuery).then(res=>res.json()).then((remainder)=>{
          remainder.forEach((post)=>{
            items.value.push(post)
          })
          loadingRemainder.value = false
        })
      }

      
      return {items, loading, loadingRemainder, loadPosts, areaNavItems, globalNavItems}
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