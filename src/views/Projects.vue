<template>
  <global-nav :items="globalNavItems" />

   <main>    
     
    <page-header />
    <div class="areasPage">
      <loading v-if="loading" :timeout="15" />
      <ul v-else class="projectList">
        <li class="project" v-for="item in items" v-bind:key="item.id">
          <router-link :to="item.url">
            {{item.name}}
          </router-link>
          <template v-for="(post, index) in item.posts" v-bind:key="post.id">
            <router-link :to="item.url" v-if="index<6">
              <img :src="post.assets.preview.source_url" />
            </router-link>
          </template>
        </li>   
      </ul>
    </div>
  </main>   

	<global-footer :items="globalNavItems" />
</template>

<script>
  import { ref, onBeforeMount, watch, getCurrentInstance } from "vue";
  import { useRoute } from 'vue-router'
  import Loading from '@/components/Loading.vue'
  import GlobalNav from '@/components/GlobalNav.vue'  
  import {globalNavItems} from '@/router/index.js'
  import PageHeader from '@/components/PageHeader.vue'  
  import GlobalFooter from '@/components/GlobalFooter.vue'  
  
  export default {
    name: 'Projects',
    components: {
      Loading,
      GlobalNav,
      PageHeader,
      GlobalFooter
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
      
      onBeforeMount(loadProjects)
      async function loadToggle(){
        console.log("ok...")
        loading.value = loading.value === true ? false : true
      }
      
      // watch(() => route.params.project, ()=>{
      //   loadProject(route.params.project)
      //   render.value = 'project'
      // })    
      
      async function loadProjects(){
        
        console.log("loadProjects re-loaded", route.params)
        
        loading.value = true
        items.value = []

        const url = `${api_endpoint}/api/projects/submissions`
        
        items.value = await fetch(url).then(res=>res.json())
        loading.value = false
        console.log(items.value)
        return true
      }
      
     
      //formats a name passed to it by replacing '-' with ' '
      const slug = (name) => {
        return name.trim().toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
      }
      
      return {items, loading, loadProjects, globalNavItems, slug}
    }
  }  
</script>

<style scoped>
  .projectList {
    list-style-type: none;
  }
</style>
