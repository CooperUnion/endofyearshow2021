<!--htmlhint attr-lowercase:false --> 
<template>
	<global-nav :items="globalNavItems" />
	<main>
		<page-header /> 

		<div class="infoPage">
			<h2>Resources used</h2>
			<ul>
				<li><a href="https://glitch.com/~endofyearshow2021-stage">~endofyearshow2021-stage</a></li>
				<li><a href="https://glitch.com/~eoys-api-2021">~eoys-api-2021</a></li>
			</ul>
			<h2>App Instance Data</h2>
			<ul>
				<li>
					<b>Current api_endpoint: {{api_endpoint}}</b>
				</li>
				<li>
					<b>Device is currently: {{mobile ? 'mobile' : 'desktop'}}</b>
				</li>
				<li>
					<b>Socket server: {{socket_server}}</b>
				</li>
			</ul> 
		</div>
	</main>
	<global-footer :items="globalNavItems" />
</template>

<script>
  import { getCurrentInstance } from 'vue'
  import GlobalNav from '@/components/GlobalNav.vue'
  import { globalNavItems } from '@/router/index.js'
  import PageHeader from '@/components/PageHeader.vue'
  import GlobalFooter from '@/components/GlobalFooter.vue'

  export default {
  name: 'Info',
  components: {
    GlobalNav,
    PageHeader,
    GlobalFooter
  },
  props: {
    theme: Array
  },
  setup(props){
    const internalInstance = getCurrentInstance()

    // const { api_endpoint, mobile } = internalInstance.appContext.config.globalProperties
    return { globalNavItems }
  }
}
</script>

<style scoped>
	.infoPage {
		width: 50vw;
		margin: 0 auto;
		padding-bottom: 200px;
	}
	
	mark {
		background-color: transparent;
		color: #DEFF10;
	}
	
	.separator {
		margin-bottom: 1.5em;
	}
	
	.separator img + img {
		margin-top: -75%;
		mix-blend-mode: screen;
	}
	
	h3 {
		font-size: 48px;
		margin-bottom: 1.5em;
	}
	
	p {
		font-size: 24px;
		margin-bottom: 1.5em;
	}
	
	small {
		font-size: 16px;
		line-height: 1.333;
	}
	
	small p {
		font-size: 16px;
	}
	
	dl {
		display: block;
		margin-bottom: 1.5em;
	}
	
	dt, dd {
		padding: 0;
	}
	
	@media screen and (max-width: 767px) {
		.infoPage {
			width: auto;
			padding-bottom: 56px;
		}
			
		.separator {
			margin-right: -90%;
			max-width: unset;
		}

		h3 {
			font-size: 30px;
		}
		
		p {
			font-size: 20px;
		}
		
		small {
			font-size: 14px;
		}
	}
</style>