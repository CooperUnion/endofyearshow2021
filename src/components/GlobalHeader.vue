<template>
	<header ref="headerElem">
		<cursors-display />
		<div class="nav-header" ref="navhedElem">
				<global-nav :items="globalNavItems" />
				<page-header v-if="!hidePageheader" />
		</div>
	</header>
</template>

<script>
  import { ref, onMounted } from 'vue'
  import { useStore } from 'vuex'  
  import { useRoute } from 'vue-router'
  import GlobalNav from '@/components/GlobalNav.vue'  
  import {globalNavItems} from '@/router/index.js'
  import PageHeader from '@/components/PageHeader.vue'  
	import CursorsDisplay from '@/components/CursorsDisplay.vue'

  export default {
    name: 'GlobalHeader',
    components: {
      GlobalNav,
      PageHeader,
			CursorsDisplay
    },
    props: {
      items: Array,
      hidePageheader: Boolean
    },
    setup(props){
      const store = useStore()
      const route = useRoute()
      
      const headerHeight = ref(0)
      const headerElem = ref(null)
      const navhedElem = ref(null)
      			
//       onMounted(() => {
//         setHeaderHeight()
//       })
      
      const setHeaderHeight = () => {
				headerHeight.value = navhedElem.value.clientHeight
      }

      return { globalNavItems, headerHeight, headerElem, navhedElem }
    }
  }
    
</script>

<style scoped>
	header {
		width: calc(100% - 240px);
		padding: 0;
		margin: 0 auto;
		position: relative;
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

		.nav-header {
			padding-top: 96px; /* The height of the logo + padding */
		}
		
		#globalnav {
			background-color: white;
			position: fixed;
			width: 100%;
			padding: 0 24px;
			top: 0;
			left: 0;
			z-index: 1;
			margin-bottom: 0;
		}
		
		body.dark #globalnav {
			background-color: black;
		}
				
	}
</style>

