<template>
  <global-nav :items="globalNavItems" />

   <main>    
     
    <page-header />
    <div class="areasPage">
      <loading v-if="loading" :timeout="15" />
      <ul v-else class="projectList">
        <li class="project" v-for="item in items" v-bind:key="item.id">
          <router-link :to="slug(item)" relative>{{item}}</router-link>
        </li>   
      </ul>
    </div>
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
    name: 'Projects',
    props: {
    },
    components: {
      Loading,
      GlobalNav,
      PageHeader
    },
    props: {
      project: Number
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
      
      watch(() => route.params.tag, loadProjects)    
      
      async function loadProjects(){
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
        return "projects/" + name.trim().toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
      }
      
      return {items, loading, loadToggle, loadProjects, globalNavItems, slug}
    }
  }  
</script>

<style scoped>
  .projectList {
    list-style-type: none;
  }
</style>
