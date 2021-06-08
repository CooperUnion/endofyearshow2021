<template>
 <global-header />
   <main>
    <div class="areasPage">
      <area-nav :items="areaNavItems" v-if="['Areas','Area','Students'].includes($route.name)" />
      <loading v-if="loading" :timeout="20" />
      <posts v-else :items="items"/>
    </div>
     <div class="controls">
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
        if(loadByDefault.value === true) {
          loadRemainder()
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
         localStorage.setItem('loadByDefault', 'true')
        } catch(e) {alert(e)}
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
  .controls {
    text-align: center;
    margin-bottom: 48px;
  }
  
  button.load-more {
    color: #fff;
    background-color: #000;
    border-radius: 1.25em;
    padding: 6px 29px 6px 48px;
    margin: 0 auto;
    display: inline-block;
    background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="16" height="16" viewBox="0, 0, 16, 16"><path d="M14.43,6.781 C15.026,6.781 15.51,7.265 15.51,7.862 C15.51,8.458 15.026,8.942 14.43,8.942 C14.426,8.942 14.422,8.942 14.418,8.942 C14.426,8.993 14.43,9.046 14.43,9.099 C14.43,9.696 13.946,10.18 13.349,10.18 C13.246,10.18 13.147,10.165 13.053,10.138 L12.166,11.025 L12.142,11.001 L12.118,11.025 L11.23,10.136 C11.134,10.164 11.032,10.179 10.927,10.179 C10.33,10.179 9.847,9.696 9.847,9.099 C9.847,9.041 9.851,8.984 9.86,8.929 C9.804,8.938 9.748,8.942 9.69,8.942 C9.093,8.942 8.609,8.459 8.609,7.862 C8.609,7.265 9.093,6.781 9.69,6.781 C10.286,6.781 10.77,7.265 10.77,7.862 C10.77,7.92 10.766,7.976 10.757,8.032 C10.812,8.023 10.869,8.019 10.927,8.019 C11.524,8.019 12.007,8.502 12.007,9.099 C12.007,9.194 11.995,9.287 11.972,9.375 L12.142,9.546 L12.306,9.382 C12.282,9.292 12.269,9.197 12.269,9.099 C12.269,8.502 12.752,8.019 13.349,8.019 L13.361,8.019 C13.353,7.967 13.349,7.915 13.349,7.862 C13.349,7.265 13.833,6.781 14.43,6.781 z" fill="white"/><path d="M7.391,12.875 C4.698,12.875 2.516,10.692 2.516,8 C2.516,5.308 4.698,3.125 7.391,3.125 C10.083,3.125 12.266,5.308 12.266,8 L12.266,9.219" fill-opacity="0" stroke="white" stroke-width="1.5" stroke-linecap="square"/></svg>');
    background-size: 24px auto;
    background-repeat: no-repeat;
    background-position: 12px center;
  }
    
  @media screen and (max-width: 767px) {
    .areasPage {
      flex-direction: column;
      position: relative;
      margin: 0;
    }
  }

</style>