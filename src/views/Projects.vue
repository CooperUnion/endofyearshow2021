<template>
	<global-header />
   <main>    
    <div class="areasPage">
      <loading v-if="loading" :timeout="15" />
      <ul v-else class="projectList">
        <li class="project" v-for="item in items" v-bind:key="item.id">
          <h4 class="title">
						<router-link :to="item.url">
							{{item.name}}
						</router-link>
          </h4>
          <ul class="thumbsList">
						<li class="thumbItem" v-for="(post, index) in item.posts" v-bind:key="post.id">
							<router-link class="thumb-imagelink" :to="item.url" v-if="index<6">
								<img :src="post.assets.preview.source_url" />
							</router-link>
							<router-link class="thumb-label" :to="item.url" v-if="index<6">
								{{post.title}}
							</router-link>
						</li>
					</ul>
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
	import GlobalHeader from '@/components/GlobalHeader.vue' 
  import GlobalFooter from '@/components/GlobalFooter.vue'  
  
  export default {
    name: 'Projects',
    components: {
      Loading,
      GlobalHeader,
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
		margin: 48px 0 0 0;
	}
	
	.projectList .title {
		font-size: 36px;
		margin-bottom: 62px;
	}
	
	.projectList .title a {
		text-decoration: none;
	}
	
	.projectList .title:hover a {
		text-decoration: underline;
	}
	
	.thumbsList {
		list-style-type: none;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin: 0;
	}
	
	.thumbsList .thumbItem {
		width: calc(33.333% - 60px);
		margin: 0 90px 60px 0;
	}
	
	@media screen and (min-width: 768px) {
		.thumbsList .thumbItem:nth-child(3n) {
			margin-right: 0;
		}
	}
	
	.thumbsList .thumbItem .thumb-imagelink {
		display: block;
		padding-bottom: 100%;
		position: relative;
	}
	
	.thumbsList .thumbItem .thumb-label {
		display: block;
		text-align: center;
		margin-top: 24px;
	}
	
	.thumbsList .thumbItem img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
	}
	
	@media screen and (max-width: 767px) {
		.thumbsList .thumbItem {
			width: calc(50% - 8px);
			margin: 0 16px 60px 0;
		}
		
		.thumbsList .thumbItem:nth-child(2n) {
			margin-right: 0;
		}
	}
</style>
