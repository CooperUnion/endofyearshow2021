<template>
	<global-header :hidePageheader="true" />
  <main>     
    <loading v-if="loading" :timeout="15" />
    <template v-else>
      <router-link to="/projects" class="backLink">All projects</router-link>
      <page-subheader :title="student" :items="students" :project="projectData" />

<!-- 
      <ul>
        <li v-for="student of students" v-bind:key="student">{{student}}</li>
      </ul>
 -->
      <project-posts :items="items" />
    </template>
  </main>   
  
	<global-footer :items="globalNavItems" />
</template>

<script>
  import { ref, onBeforeMount, watch, getCurrentInstance } from "vue";
  import { useRoute } from 'vue-router'
  
  import Loading from '@/components/Loading.vue'
  import {globalNavItems} from '@/router/index.js'
  import PageSubheader from '@/components/PageSubheader.vue'  
  import ProjectPosts from '@/components/ProjectPosts.vue'
	import GlobalHeader from '@/components/GlobalHeader.vue' 
  import GlobalFooter from '@/components/GlobalFooter.vue'
  
  export default {
    name: 'Project',
    components: {
      Loading,
      GlobalHeader,
      PageSubheader,
      ProjectPosts,
      GlobalFooter
    },
    props: {
      project: String,
      theme: String
    },
    setup(props){
      const loading = ref(true)
      const items = ref([])
      const students = ref([])
      const projectData = ref([])
      const route = useRoute()
      const internalInstance = getCurrentInstance()
      const { api_endpoint } = internalInstance.appContext.config.globalProperties
      
      onBeforeMount(()=>{
        loadProject(route.params.project)
      })
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

        const project_submissions_url = `${api_endpoint}/api/projects/submissions`
        const project_url = `${api_endpoint}/api/posts/project/${slug}`
        const students_url = `${api_endpoint}/api/projects/students/${slug}`
        
        items.value = await fetch(project_url).then(r=>r.json())
        students.value = await fetch(students_url).then(r=>r.json())
        const projectRequest = await fetch(project_submissions_url)
          .then(r=>r.json())

        
        projectData.value = projectRequest.filter((project)=>{
          return project.slug === route.params.project
        }).pop()

        loading.value = false
        return true
      
      }
      
      //formats a name passed to it by replacing '-' with ' '
      const slug = (name) => {
        return name.trim().toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
      }
      
      return {items, loading, globalNavItems, slug, students, projectData}
    }
  }  
</script>

<style scoped>
  .projectList {
    list-style-type: none;
  }
  
  .backLink {
  		line-height: 1;
			background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12L3 12" stroke="black" stroke-linecap="round"/><path d="M9 6L3 12L9 18" stroke="black" stroke-linecap="round"/></svg>');
			background-size: auto 1.5em;
			background-repeat: no-repeat;
			background-position: left 60%;
			padding-left: 2em;
			text-decoration: none;
			transition: transform 0.2s cubic-bezier(0, 1.4, 1, 1), opacity 0.2s ease-in-out;
  }
  
  .backLink:hover {
			text-decoration: underline;
  }
  
  header:hover ~ main .backLink {
			transform: scale(0.99);
  	opacity: 0;
  }
</style>
