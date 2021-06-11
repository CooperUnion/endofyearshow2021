<template>
	<global-header />
   <main>    
     <div class="studentsPage">
      <loading v-if="loading" :timeout="15" />
      <div v-else v-for="instructor in faculty" v-bind:key="instructor.name">
        <h2>{{instructor.name}}</h2>
        <ul class="studentsList">
          <li class="student" v-for="student in instructor.students" v-bind:key="student">
            <router-link class="lensLink" :to="'/student/'+slug(student)">
              <student-tag-circles :tags="studentTags(slug(student))" />
            </router-link>
            <router-link class="studentLink" :to="'/student/'+slug(student)">
              {{student}}
            </router-link>
          </li>   
        </ul>
      </div>
    </div>
  </main>   

	<global-footer :items="globalNavItems" />
</template>

<script>
  import { ref, onBeforeMount, onMounted, watch, getCurrentInstance } from "vue";
  import { useRoute } from 'vue-router'
  import Loading from '@/components/Loading.vue'
  import { globalNavItems } from '@/router/index.js'
  import GlobalHeader from '@/components/GlobalHeader.vue'  
  import GlobalFooter from '@/components/GlobalFooter.vue'
  import StudentTagCircles from '@/components/StudentTagCircles.vue'
  import { slug } from '@/lib/utils.js'
  
  export default {
    name: 'Faculty',
    components: {
      Loading,
      GlobalHeader,
      GlobalFooter,
      StudentTagCircles
    },
    props: {
      theme: Array
    },
    setup(props){
      const loading = ref(true)
      const route = useRoute()
      const internalInstance = getCurrentInstance()
      const { api_endpoint } = internalInstance.appContext.config.globalProperties
      const faculty = ref([])
      const students = ref([])

      onMounted(loadPeople)
      
      async function loadPeople(){
                
        loading.value = true
        faculty.value = []

        const url = `${api_endpoint}/api/faculty`
        faculty.value = await fetch(url).then(res=>res.json()).catch((e)=>{
          console.log("faculty.value in faculty.vue data fetching error", e)
        })

        // ridiculous function to split a string like "Erin Sparling"
        // and sort by the first letter of the last name
        faculty.value = faculty.value.sort((a, b)=>{
          a = a.name.split(' ')
          b = b.name.split(' ')
          return a[1].charCodeAt(0) - b[1].charCodeAt(0)
        })

        const student_url = `${api_endpoint}/api/students`
        students.value = await fetch(student_url).then(res=>res.json()).catch((e)=>{
          console.log("students.value in Students.vue data fetching error", e)
        })        
        loading.value = false
        return true
      }

      function studentTags(slug) {
        return students.value.filter((student)=>{
          return student.slug === slug
        }).shift().tags
      }
      
      return {faculty, students, studentTags, loading, loadPeople, globalNavItems, slug }
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
