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
      
      onMounted(loadPosts)
      
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
  
  button.load-more {
			color: #fff;
			background-color: #000;
			border-radius: 1.25em;
			padding: 6px 29px;
			margin: 0;
			display: inline-block;
		  background-image: url();

    
/*     <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m14.43 6.781c.596 0 1.08.484 1.08 1.081 0 .596-.484 1.08-1.08 1.08-.004 0-.008 0-.012 0 .008.051.012.104.012.157 0 .597-.484 1.081-1.081 1.081-.103 0-.202-.015-.296-.042l-.887.887-.024-.024-.024.024-.888-.889c-.096.028-.198.043-.303.043-.597 0-1.08-.483-1.08-1.08 0-.058.004-.115.013-.17-.056.009-.112.013-.17.013-.597 0-1.081-.483-1.081-1.08s.484-1.081 1.081-1.081c.596 0 1.08.484 1.08 1.081 0 .058-.004.114-.013.17.055-.009.112-.013.17-.013.597 0 1.08.483 1.08 1.08 0 .095-.012.188-.035.276l.17.171.164-.164c-.024-.09-.037-.185-.037-.283 0-.597.483-1.08 1.08-1.08h.012c-.008-.052-.012-.104-.012-.157 0-.597.484-1.081 1.081-1.081z" fill="#fff"/><g fill="none" stroke="#fff"><path d="m14.43 6.781c.596 0 1.08.484 1.08 1.081 0 .596-.484 1.08-1.08 1.08-.004 0-.008 0-.012 0 .008.051.012.104.012.157 0 .597-.484 1.081-1.081 1.081-.103 0-.202-.015-.296-.042l-.887.887-.024-.024-.024.024-.888-.889c-.096.028-.198.043-.303.043-.597 0-1.08-.483-1.08-1.08 0-.058.004-.115.013-.17-.056.009-.112.013-.17.013-.597 0-1.081-.483-1.081-1.08s.484-1.081 1.081-1.081c.596 0 1.08.484 1.08 1.081 0 .058-.004.114-.013.17.055-.009.112-.013.17-.013.597 0 1.08.483 1.08 1.08 0 .095-.012.188-.035.276l.17.171.164-.164c-.024-.09-.037-.185-.037-.283 0-.597.483-1.08 1.08-1.08h.012c-.008-.052-.012-.104-.012-.157 0-.597.484-1.081 1.081-1.081z" stroke-linecap="round"/><path d="m7.391 12.875c-2.693 0-4.875-2.183-4.875-4.875s2.182-4.875 4.875-4.875c2.692 0 4.875 2.183 4.875 4.875v1.219" stroke-linecap="square" stroke-width="2"/></g></svg> */
  }
    
  @media screen and (max-width: 767px) {
    .areasPage {
      flex-direction: column;
      position: relative;
      margin: 0;
    }
  }

</style>