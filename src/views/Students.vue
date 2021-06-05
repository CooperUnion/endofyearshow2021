<template>
  <global-nav :items="globalNavItems" />

   <main>    
     
    <page-header />
    <div class="studentsPage">
      <area-nav v-if="areaNavItems" :items="areaNavItems" />
    
      <loading v-if="loading" :timeout="15" />
      <ul v-else class="studentsList">
        <li class="student" v-for="student in students" v-bind:key="student.slug">
          <router-link class="lensLink" :to="'/student/'+student.slug"><student-tag-circles :tags="student.tags" /></router-link>
          <router-link class="studentLink" :to="'/student/'+student.slug">{{student.formatted}}</router-link>
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
  import AreaNav from '@/components/AreaNav.vue'
  import areaNavItems from '@/router/areaNavItems.js'
  import GlobalFooter from '@/components/GlobalFooter.vue'
  import StudentTagCircles from '@/components/StudentTagCircles.vue'
  
  export default {
    name: 'Students',
    components: {
      Loading,
      GlobalNav,
      PageHeader,
      AreaNav,
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
      const areaNavItems = ref(areaNavItems)
      
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
        
        students.value = await fetch(url).then(res=>res.json()).catch((e)=>{
          console.log("students.value in Students.vue data fetching error", e)
        })
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
      
      return {students, loading, loadStudents, areaNavItems, globalNavItems, slug}
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
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 0;
	}
	
	.studentsList .student {
		width: 25%;
		text-align: center;
		margin-bottom: 66px;
	}
	
	.studentsList .lensLink {
		display: block;
		min-height: 160px;
	}
	
	.studentsList .studentLink {
		display: block;
		font-size: 16px;
		text-decoration: none;
		margin-top: 6px;
	}
	
	.studentsList a:hover {
		text-decoration: underline;
	}
	
	@media screen and (max-width: 767px) {
		.studentsList .student {
			width: 50%;
		}
		
		.studentsList .studentLink {
			margin-top: -6px;
		}
	}
</style>
