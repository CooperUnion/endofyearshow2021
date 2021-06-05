<template>
  <global-nav :items="globalNavItems" />

  <main>     
    <loading v-if="loading" :timeout="15" />
    <template v-else>
      <router-link to="/students">&#8592; all students</router-link>
      <ul>
        <li v-for="student of students" v-bind:key="student">{{student}}</li>
      </ul>
      <project-posts :items="items" />
    </template>
  </main>   

	<global-footer :items="globalNavItems" />
</template>

<script>
  import { ref, onMounted, watch, getCurrentInstance } from "vue";
  import { useRoute } from 'vue-router'
  
  import Loading from '@/components/Loading.vue'
  import GlobalNav from '@/components/GlobalNav.vue'  
  import {globalNavItems} from '@/router/index.js'
  import PageHeader from '@/components/PageHeader.vue'  
  import ProjectPosts from '@/components/ProjectPosts.vue'
  import GlobalFooter from '@/components/GlobalFooter.vue'
  
  export default {
    name: 'Project',
    components: {
      Loading,
      GlobalNav,
      ProjectPosts,
      GlobalFooter
    },
    props: {
      project: String
    },
    setup(props){
      const loading = ref(true)
      const items = ref([])
      const students = ref([])
      const route = useRoute()
      const internalInstance = getCurrentInstance()
      const { api_endpoint } = internalInstance.appContext.config.globalProperties
      
      onMounted(()=>{
        loadStudent(route.params.student)
      })
      async function loadToggle(){
        console.log("ok...")
        loading.value = loading.value === true ? false : true
      }
      
      watch(() => route.params.student, ()=>{
        loadStudent(route.params.student)
      })    
      
      async function loadStudent(slug) {
         console.log("loadStudent triggered", slug)
        
        loading.value = true
        items.value = []

        const posts_url = `${api_endpoint}/api/posts/student/${slug}`
        items.value = await fetch(posts_url).then(r=>r.json())
      
        loading.value = false
        return true
      }
      
      const slug = (name) => {
        return name.trim().toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
      }
      
      return {items, loading, globalNavItems, slug, students}
    }
  }  
</script>

<style scoped>
  .projectList {
    list-style-type: none;
  }
</style>
