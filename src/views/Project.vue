<template>
  <global-nav :items="globalNavItems" />

   <main>    
     
       <loading v-if="loading" :timeout="15" />

  </main>   

</template>

<script>
  import { ref, onBeforeMount, watch, getCurrentInstance } from "vue";
  import { useRoute } from 'vue-router'
  
  import Loading from '@/components/Loading.vue'
  import GlobalNav from '@/components/GlobalNav.vue'  
  import {globalNavItems} from '@/router/index.js'
  import PageHeader from '@/components/PageHeader.vue'  

  
  export default {
    name: 'Project',
    components: {
      Loading,
      GlobalNav
    },
    props: {
      project: String
    },
    setup(props){
      const loading = ref(true)
      const items = ref()
      const route = useRoute()
      const internalInstance = getCurrentInstance()
      const { api_endpoint } = internalInstance.appContext.config.globalProperties
      
      onBeforeMount(loadProject)
      async function loadToggle(){
        console.log("ok...")
        loading.value = loading.value === true ? false : true
      }
      
      watch(() => route.params.project, ()=>{
        loadProject(route.params.project)
      })    
      
      async function loadProject(slug) {
         console.log("loadProject triggered", slug)
        
        loading.value = true
        items.value = []

        const urls = {
          project: `${api_endpoint}/api/posts/project/${slug}`,
          students: `${api_endpoint}/api/projects/students/${slug}`
        } 
        
        items.value  = await Promise.all(Object.keys(urls).map(async (source)=>{
          
          return await fetch(urls[source]).then(res=>res.json())
          
        }))
       
        loading.value = false
        console.log(items.value)
        return true
      
      }
      
      //formats a name passed to it by replacing '-' with ' '
      const slug = (name) => {
        return name.trim().toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
      }
      
      return {items, loading, globalNavItems, slug}
    }
  }  
</script>

<style scoped>
  .projectList {
    list-style-type: none;
  }
</style>
