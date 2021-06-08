<template>
	<nav id="globalnav" :class="{showNav : globalnavShow}">
		<div class="logoBanner">
			<a href="/"><h1 class="logo">EOYS 2021</h1></a>
			<visitor-count v-if="!mobile">2 other visitors online</visitor-count>
			<button class="globalnav-toggle" v-if="mobile" @click="toggleGlobalPanel()">Navigation menu</button> 
		</div>
		<div class="nav-panel">
			<button v-if="mobile" class="close" @click="closeGlobalPanel()">close</button> 
			<ul class="nav-list">
				<li v-for="item in items" :key="item" :class="['nav-item', isActiveRoute(item.name)]"> 
					<!-- <router-link :to="item.path" @click="closeGlobalPanel()">{{item.name}}</router-link>  -->
					<a :href="item.path" @click="closeGlobalPanel()">{{item.name}}</a> 
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
  import { ref, computed } from 'vue'
  import { useStore } from 'vuex'  
  import { useRoute } from 'vue-router'
  import VisitorCount from '@/components/VisitorCount.vue'

  export default {
    name: 'GlobalNav',
    components: {
      VisitorCount
    },
    props: {
      items: Array
    },
    setup(props){
      const store = useStore()
      const route = useRoute()
      const globalnavShow = ref(false)

      //returns state for all area-nav items
      const activeGlobal = store.state.application.activeGlobal
      
      const isActiveRoute = (current) => {
        if(current === route.name || current === route.name + 's') {
          store.commit('setGlobalNav', current)
          return 'active'
        }
        
        return undefined
      }
      
      const toggleGlobalPanel = () => {
        globalnavShow.value = !globalnavShow.value
      }

      const closeGlobalPanel = () => {
        globalnavShow.value = false
      }

      return { isActiveRoute, globalnavShow, toggleGlobalPanel, closeGlobalPanel }
    }
  }
    
</script>

<style scoped>
	header {
		width: calc(100% - 240px);
		padding: 0;
		margin: 0 auto;
	}
	
	#globalnav {
		margin-bottom: 12px;
	}
	
	.logoBanner {
		position: relative;
	}
	
	.logo {
		overflow: hidden;
		text-indent: -999vw;
		background-image: url(../assets/logo.svg);
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center center;
		width: 268px;
		height: 48px;
		margin: 0 auto;
		padding: 48px 0;
		display: block;
	}
	
	.nav-list {
		list-style-type: none;
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 0 0 24px 0;
		margin: 0;
		font-size: 16px;
		line-height: 1.5;
		cursor: pointer;
		transition: transform 0.2s cubic-bezier(0, 1.4, 1, 1), opacity 0.2s ease-in-out;
	}
	
	@media screen and (hover: hover) {
		#globalnav:not(:hover) .nav-list {
			transform: scale(0.9);
			opacity: 0;
		}
	}
	
	.nav-list .nav-item + .nav-item {
		margin-left: 1.5em;
	}
	
	.nav-list .nav-item a {
		text-decoration: none;
		font-weight: 300;
	}
	
	.nav-list .nav-item a:hover {
		text-decoration: underline;
	}
	
	.nav-list .active a {
		font-weight: 500;
	}
	
	.globalnav-toggle, .close {
		display: none;
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
		
		body:not(.dark) .logoBanner {
			background-color: transparent;
		}
		
		.logo {
			width: 241px;
			height: 43px;
			margin: 0;
		}
		
		.nav-panel {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			color: #fff;
			background-color: #000;
			box-shadow: 0 -50vh #000;
			z-index: 1;
			padding: 36px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			transition: transform 0.2s cubic-bezier(0, 1.4, 1, 1);
		}
		
		#globalnav:not(.showNav) .nav-panel {
			transform: translateY(-100.1vh);
		}
		
		.nav-list {
			font-size: 24px;
			flex-direction: column;
			text-align: left;
			padding: 0;
		}
		
		.nav-list .nav-item {
			margin-bottom: 1em;
			transition: margin .333s cubic-bezier(0.34, 1.56, 0.64, 1);
		}
		
		#globalnav:not(.showNav) .nav-list .nav-item {
			margin-bottom: 2em;
		}
		
		.nav-list .nav-item + .nav-item {
			margin-left: 0;
		}
		
		.globalnav-toggle {
			display: block;
			position: absolute;
			top: 24px;
			right: 0;
			margin: 0;
			width: 48px;
			height: 48px;
			overflow: hidden;
			text-indent: -999vw;
			background-image: url('data:image/svg+xml;utf8,<svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="black"/><circle cx="21" cy="20" r="11.5" fill="white" stroke="black"/></svg>');
			background-size: 32px auto;
			background-repeat: no-repeat;
			background-position: center center;
			border-radius: 7px;
			background-color: white;
			border: 1px solid black;
		}
		
		.close {
			display: block;
			position: absolute;
			top: 24px;
			right: 24px;
			height: 48px;
			width: 48px;
			margin: 0;
			padding: 0;
			background-color: transparent;
			background-image: url(../assets/close.svg);
			background-size: 36px 36px;
			background-repeat: no-repeat;
			background-position: center center;
			text-indent: -999vw;
			overflow: hidden;
		}
	}
</style>

