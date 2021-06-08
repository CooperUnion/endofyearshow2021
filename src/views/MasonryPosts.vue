<template>
 <global-header />
   <main>
    <div class="areasPage">
      <area-nav :items="areaNavItems" v-if="['Areas','Area','Students'].includes($route.name)" />
      <loading v-if="loading" :timeout="20" />
      <posts v-else :items="items"/>
    </div>
     <button class="load-more" v-if="loadedRemainder===false && loadByDefault===false" @click="loadRemainder()">Load more</button>
    <loading v-if="loadingRemainder" :timeout="20" />
    <!-- <div>
      <h1 v-scroll="test">only shows up after loading...</h1>
    </div> -->
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
  import TagDot from '@/components/TagDot.vue'

  export default {
    components: {
      Loading,
      Posts,
      AreaNav,
      GlobalHeader,
      GlobalFooter,
      TagDot
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
      const loadByDefault = ref(false)
      
      onMounted(init)
      
      async function init(){
        loadPosts()
        try{
          loadByDefault.value = localStorage.getItem('loadByDefault') === 'true'
        } catch (e){
          // no pref
        }
      }
      
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
        const query = `?limit=20`
        const urlQuery = url+query

        items.value = await fetch(urlQuery).then(res=>res.json())
        loading.value = false
        //loadRemainder()
        return true
      }

      const loadedRemainder = ref(false)
      function loadRemainder() {
        loadedRemainder.value = true
        loadingRemainder.value = true
        //try{
        //  localStorage.setItem('loadByDefault', 'true')
        //} catch(e) {alert(e)}
        const url = (props.postsEndpointSuffix) 
          ? `${api_endpoint}/api/posts/${props.postsEndpointSuffix}`
          : `${api_endpoint}/api/posts`
        const query = `?limit=1000&offset=20`
        const urlQuery = url+query

        fetch(urlQuery).then(res=>res.json()).then((remainder)=>{
          //remainder.forEach((post)=>{
          //  items.value.push(post)
          //})
          items.value=items.value.concat(remainder)
          loadingRemainder.value = false
        })
      }

      
      return {
        items, 
        loading,
        loadByDefault,
        loadRemainder, 
        loadingRemainder, 
        loadedRemainder, 
        loadPosts, 
        areaNavItems, 
        globalNavItems
      }
    }
  }
</script>

<style scoped>
  
  .areasPage {
    display: flex;
    flex-direction: row;
    padding-top: 48px; /* <-- tentative */
  }
  
  .load-more {
    
    
  }
    
  @media screen and (max-width: 767px) {
    .areasPage {
      flex-direction: column;
      position: relative;
      margin: 0;
    }
  }

</style>