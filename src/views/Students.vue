<template>
  <global-nav :items="globalNavItems" />

   <main>    
     
    <page-header />
    <div class="studentsPage">
      <loading v-if="loading" :timeout="15" />
      <ul v-else class="studentsList">
        <li class="student" v-for="student in students" v-bind:key="student.slug">
          <router-link :to="'/student/'+student.slug">{{student.formatted}}</router-link>
          <student-tag-circles :tags="student.tags" />
        </li>   
      </ul>
    </div>
  </main>   

	<global-footer :items="globalNavItems" />
</template>

<script>
  import { ref, onBeforeMount, onMounted, watch, getCurrentInstance } from "vue";
  import { useRoute } from 'vue-router'
  
  import Loading from '@/components/Loading.vue'
  import GlobalNav from '@/components/GlobalNav.vue'  
  import {globalNavItems} from '@/router/index.js'
  import PageHeader from '@/components/PageHeader.vue'  
  import GlobalFooter from '@/components/GlobalFooter.vue'
  import StudentTagCircles from '@/components/StudentTagCircles.vue'
  
  export default {
    name: 'Students',
    components: {
      Loading,
      GlobalNav,
      PageHeader,
      GlobalFooter,
      StudentTagCircles
    },
    props: {},
    setup(props){
      const loading = ref(true)
      const students = ref()
      const route = useRoute()
      const internalInstance = getCurrentInstance()
      const { api_endpoint } = internalInstance.appContext.config.globalProperties
      
      const delayed = ref(false)

      onMounted(loadStudents)
      async function loadToggle(){
        console.log("ok...")
        loading.value = loading.value === true ? false : true
      } 
      
      async function loadStudents(){
        
        console.log("loadStudents re-loaded", route.params)
        
        loading.value = true
        students.value = []

        const url = `${api_endpoint}/api/students`
        
        students.value = await fetch(url).then(res=>res.json())
        loading.value = false

        fetchAllStudentTags()
        return true
      }

      function fetchAllStudentTags(){

        for (let i = 0; i<students.value.length; i++) {
          try {
            const { slug } = students.value[i]
            const url = `${api_endpoint}/api/tags/student/${slug}`
          
            fetch(url).then(res=>res.json()).then((tags)=>{
              students.value[i].tags = tags
            }).catch((e)=>{})
          } catch(e) {

          }
        }
      }
      

     
      //formats a name passed to it by replacing '-' with ' '
      const slug = (name) => {
        return name.trim().toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
      }
      
      return {students, loading, loadStudents, globalNavItems, slug}
    }
  }  
</script>

<style scoped>
  .studentsPage {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .studentsList {
    list-style-type: none;
  }
</style>
