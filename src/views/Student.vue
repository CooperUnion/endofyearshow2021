<template>
	<global-header :hidePageheader="true" />
  <main>     
    <loading v-if="loading" :timeout="15" />
    <template v-else>
      <router-link to="/students" class="backLink">All students</router-link>
      <student-subheader :name="student.formatted" :tags="student.tags" />
      <project-posts :items="items" />
    </template>
  </main>   

	<global-footer :items="globalNavItems" />
</template>

<script>
  import { ref, onMounted, watch, getCurrentInstance } from "vue";
  import { useRoute } from 'vue-router'
  
  import Loading from '@/components/Loading.vue'
  import {globalNavItems} from '@/router/index.js'
  import StudentSubheader from '@/components/StudentSubheader.vue'  
  import ProjectPosts from '@/components/ProjectPosts.vue'
	import GlobalHeader from '@/components/GlobalHeader.vue' 
  import GlobalFooter from '@/components/GlobalFooter.vue'
  
  export default {
    name: 'Student',
    components: {
      Loading,
      GlobalHeader,
      StudentSubheader,
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
      const student = ref({})
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
        //  console.log("loadStudent triggered", slug)
        
        loading.value = true
        items.value = []

        const posts_url = `${api_endpoint}/api/posts/student/${slug}`
        items.value = await fetch(posts_url).then(r=>r.json())
      
        const student_url = `${api_endpoint}/api/student/${slug}`
        student.value = await fetch(student_url).then(r=>r.json())
        loading.value = false
        return true
      }
      
      const slug = (name) => {
        return name.trim().toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
      }
      
      return {items, loading, globalNavItems, slug, student}
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
