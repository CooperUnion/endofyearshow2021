<template>
	<header>
		<global-nav :items="globalNavItems" />
    <page-header />
	</header>
</template>

<script>
  import { ref, computed } from 'vue'
  import { useStore } from 'vuex'  
  import { useRoute } from 'vue-router'
  import GlobalNav from '@/components/GlobalNav.vue'  
  import {globalNavItems} from '@/router/index.js'
  import PageHeader from '@/components/PageHeader.vue'  

  export default {
    name: 'GlobalHeader',
    components: {
      GlobalNav,
      PageHeader
    },
    props: {
      items: Array
    },
    setup(props){
      const store = useStore()
      const route = useRoute()

      return { globalNavItems }
    }
  }
    
</script>

<style scoped>
	header {
		width: calc(100% - 240px);
		padding: 0;
		margin: 0 auto;
	}
		
	@media screen and (min-width: 768px) and (max-width: 1024px) {
		header {
			width: calc(100vw - 72px);
		}
	}
	
	@media screen and (max-width: 767px) {
		header {
			width: calc(100vw - 48px);
		}
	}
</style>

