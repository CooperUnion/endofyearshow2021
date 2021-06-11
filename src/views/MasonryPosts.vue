<template>
 <global-header />
   <main>
    <div class="areasPage">
      <area-nav :items="areaNavItems" v-if="['Areas','Area','AreasRandom','Students'].includes($route.name)" />
      <loading v-if="loading" :timeout="20" />
      <posts v-else :items="items" />
    </div>
     <div class="controls" v-if="route.name !== 'AreasRandom'">
       <button class="load-more" v-if="loadedRemainder===false && loadByDefault===false" @click="loadRemainder()">Load all</button>
    </div>
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
      theme: Array
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
      
      watch(() => [route.path, route.params.tag], ()=>{
        // console.log(route.name)
        loadPosts()
      })

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
        const query = `?limit=30`
        const urlQuery = url+query

        items.value = await fetch(urlQuery).then(res=>res.json())
        loading.value = false
        if(loadByDefault.value === true) {
          //loadRemainder()
        } else {
          console.log(loadByDefault.value, "lbd value")
        }
        //loadRemainder()
        return true
      }

      const loadedRemainder = ref(false)
      function loadRemainder() {
        loadedRemainder.value = true
        loadingRemainder.value = true
        try{
         //localStorage.setItem('loadByDefault', 'true')
        } catch(e) {alert(e)}
        const url = (props.postsEndpointSuffix) 
          ? `${api_endpoint}/api/posts/${props.postsEndpointSuffix}`
          : `${api_endpoint}/api/posts`
        const query = `?limit=1000&offset=30`
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
        globalNavItems,
        route
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
  .controls {
    text-align: center;
    margin-bottom: 48px;
  }
  
  button.load-more {
    color: #fff;
    background-color: #000;
    border-radius: 1.25em;
    padding: 6px 29px 6px 45px;
    margin: 0 auto;
    display: inline-block;
    background-image: url('../assets/loadmore.svg');
    background-size: 24px auto;
    background-repeat: no-repeat;
    background-position: 11px center;
  }
    
  @media screen and (max-width: 767px) {
    .areasPage {
      flex-direction: column;
      position: relative;
      margin: 0;
    }
  }

</style>