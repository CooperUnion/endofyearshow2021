<template>
 
	<div id="pagenav" class="headerBlock">
		<div class="bannerTitle">
			<div class="titleBlock">
				<h2 v-if="currentPageConfig.title" class="mainHead">
					{{currentPageConfig.title}} 
				</h2>
			</div>
			<div class="operationsBlock">
	<!-- RANDOMIZE BUTTON WOULD GO HERE -->
			</div>
		</div>
		<div class="bannerDescription">
			<div class="descBlock">
				<div v-if="currentPageConfig.body" class="mainDesc">
					{{currentPageConfig.body}} 
				</div>
			</div>
		</div>
		<div class="bannerSecondaryOps">
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
	
	.bannerTitle {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.bannerSecondaryOps {
		margin-top: 48px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.titleBlock,
			.descBlock {
		width: 61%;
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
		
		.bannerDescription {
			order: 2;
		}
		
		.bannerSecondaryOps {
			margin-top: 24px;
		}
		
		.titleBlock, 
						.descBlock {
			width: auto;
		}
	}
</style>

