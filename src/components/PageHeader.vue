<template>
 
<div class="headerBlock">
	<div class="bannerPrimary">
		<div class="titleBlock">
			<h2 v-if="currentPageConfig.title" class="mainHead">
				{{currentPageConfig.title}} 
			</h2>
			<div v-if="currentPageConfig.body" class="mainDesc">
				{{currentPageConfig.body}} 
			</div>
		</div>
		<div class="operationsBlock">
		<!-- RANDOMIZE BUTTON WOULD GO HERE -->
		</div>
	</div>
	<div class="bannerSecondary">
		<page-header-button v-if="currentPageConfig.refreshEnabled===true" /> 
	</div>
</div>
</template>

<script>
  import { ref, watch } from "vue";
  import { useRoute } from 'vue-router'  
  import PageHeaderButton from '@/components/PageHeaderButton.vue'
  import pageConfig from '@/router/pageConfig.js'
  
  export default {
    name: 'Pageheader',
    components: {
      PageHeaderButton
    },
    props: {
      title: String,
      body: String
    },
    setup(props){
      const route = useRoute()
      const currentRoute = ref(route.name.toLowerCase())
      const currentPageConfig = ref({
        title: '',
        body: ''
      })
      
      const initPageConfig = ()=>{
        try{
          currentPageConfig.value = pageConfig[currentRoute.value] || pageConfig['areas']
          // console.log('updated currentPageConfig properly')
        } catch(e) {
          currentPageConfig.value = pageConfig['areas']
          console.log('failed to update currentPageConfig properly, defaulting')
        }
      }

      watch(() => route.path, ()=>{
        currentRoute.value = route.name.toLowerCase()
        initPageConfig()
      })
      
      initPageConfig()
      
      return {currentPageConfig}
    }
  }
  
</script>

<style scoped>
	.headerBlock {
		display: flex;
		flex-direction: column;
	}
	
	.bannerPrimary {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.bannerSecondary {
		margin-top: 48px;
	}
	
	.titleBlock {
		width: 61%;
	}
	
	.listBlock {
		width: 39%;
		text-align: left;
	}
	
	.mainHead {
		font-size: 48px;
		text-align: left;
		text-transform: capitalize;
		font-weight: 500;
		margin: 0;
	}
	
	.mainDesc {
		text-align: left;
		font-size: 18px;
		font-weight: 500;
		line-height: 24px;
		margin: 48px 0 0 0;
	}
	
	@media screen and (max-width: 767px) {
		.mainHead {
			font-size: 32px;
		}
		
		.titleBlock {
			width: auto;
		}
	.bannerSecondary {
		margin-top: 48px;
	}
	
	}
</style>

