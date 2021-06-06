<template>
	<header>
		<nav id="globalnav" :class="{showNav : globalnavShow, dark : themeDark}">
		<div class="logoBanner">
			<a href="/"><h1 class="logo">EOYS 2021</h1></a>
			<visitor-count v-if="!mobile">
			2 other visitors online
			</visitor-count>
			<button class="globalnav-toggle" v-if="mobile" @click="toggleGlobalPanel()">Navigation menu</button> 
		</div>
			<div class="nav-panel">
				<button v-if="mobile" class="close" @click="closeGlobalPanel()">close</button> 
				<ul class="nav-list">
					<li v-for="item in items" :key="item" :class="['nav-item', isActiveRoute(item.name)]"> <router-link :to="item.path" @click="closeGlobalPanel()">{{item.name}}</router-link> </li>
				</ul>
			</div>
		</nav>
	</header>
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
      items: Array,
      themeDark: Boolean
    },
    setup(props){
      const store = useStore()
      const route = useRoute()
      const globalnavShow = ref(false)

      //returns state for all area-nav items
      const activeGlobal = store.state.application.activeGlobal

      const isActiveRoute = (current) => {
        if(current === route.name) {
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
	}
	
	.nav-list .nav-item a:hover {
		text-decoration: underline;
	}
	
	.nav-list .active {
		font-weight: 700;
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
			margin-bottom: 24px;
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
			background-image: url('data:image/svg+xml;utf8,<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="17" stroke="white" stroke-width="2"/><path fill-rule="evenodd" clip-rule="evenodd" d="M26.1805 12.8682C26.1805 14.1761 25.1202 15.2364 23.8122 15.2364C23.6854 15.2364 23.5608 15.2265 23.4393 15.2072C23.4585 15.3287 23.4685 15.4533 23.4685 15.5801C23.4685 16.8881 22.4082 17.9484 21.1003 17.9484C20.8914 17.9484 20.6888 17.9213 20.4958 17.8705L20.1216 18.2447L20.4804 18.6035C20.678 18.5501 20.8858 18.5215 21.1003 18.5215C22.4082 18.5215 23.4685 19.5818 23.4685 20.8898L23.4684 20.9145C23.5807 20.8982 23.6955 20.8897 23.8122 20.8897C25.1202 20.8897 26.1805 21.95 26.1805 23.2579C26.1805 24.5659 25.1202 25.6262 23.8122 25.6262C22.5043 25.6262 21.444 24.5659 21.444 23.2579L21.4441 23.2332C21.3319 23.2495 21.2171 23.258 21.1003 23.258C19.7924 23.258 18.7321 22.1977 18.7321 20.8898C18.7321 20.6646 18.7635 20.4468 18.8222 20.2404L18.4223 19.8405L17.9335 20.3292C17.9929 20.5377 18.0248 20.7577 18.0248 20.9852C18.0248 22.3037 16.9559 23.3725 15.6374 23.3725C15.5163 23.3725 15.3973 23.3635 15.281 23.3461C15.3019 23.4728 15.3128 23.6028 15.3128 23.7353C15.3128 25.0538 14.2354 26.1226 12.9064 26.1226C11.5774 26.1226 10.5 25.0538 10.5 23.7353C10.5 22.4168 11.5774 21.348 12.9064 21.348C13.0342 21.348 13.1597 21.3579 13.2821 21.3769C13.2611 21.2495 13.2501 21.1186 13.2501 20.9852C13.2501 19.6667 14.319 18.5979 15.6374 18.5979C15.853 18.5979 16.0619 18.6265 16.2605 18.68L16.6215 18.319L16.2483 17.9459C16.0533 17.9973 15.8486 18.0247 15.6374 18.0247C14.319 18.0247 13.2501 16.9559 13.2501 15.6374C13.2501 15.6358 13.2501 15.6341 13.2501 15.6324C13.1379 15.6483 13.0231 15.6566 12.9064 15.6566C11.5774 15.6566 10.5 14.5877 10.5 13.2693C10.5 11.9508 11.5774 10.8819 12.9064 10.8819C14.2354 10.8819 15.3128 11.9508 15.3128 13.2693C15.3128 13.2702 15.3128 13.2711 15.3128 13.272C15.419 13.2576 15.5273 13.2501 15.6374 13.2501C16.9559 13.2501 18.0248 14.3189 18.0248 15.6374C18.0248 15.8693 17.9917 16.0934 17.9301 16.3054L18.3479 16.7232L18.8266 16.2446C18.7651 16.0338 18.7321 15.8108 18.7321 15.5801C18.7321 14.2722 19.7924 13.2119 21.1003 13.2119C21.2272 13.2119 21.3517 13.2219 21.4732 13.2411C21.454 13.1196 21.444 12.9951 21.444 12.8682C21.444 11.5603 22.5043 10.5 23.8122 10.5C25.1202 10.5 26.1805 11.5603 26.1805 12.8682Z" fill="white"/></svg>');
			background-size: 36px 36px;
			background-repeat: no-repeat;
			background-position: center center;
			text-indent: -999vw;
			overflow: hidden;
		}
	}
</style>

