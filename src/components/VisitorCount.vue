<template> 
	<div class="visitorCount"
			@mouseover="interacting=true">
		<ul class="badges" >
			<li>
				<span class="readout">
					{{ connections }} 
					other {{storeRetreivedData.connections>1 ? 'visitors' : 'visitor'}} 
					online
			</span>
		 </li>
			<li class="badge">
				<span class="status" :class="{online: connections>0 }">
					{{ connections.length > 0 ? 'online' : 'offline' }}
				</span>
			</li>
		</ul>
		<div
			@mouseout="interacting=false" v-if="interacting===true" class="options">
			<p @click="reset">Reset cursor prefs</p>
		</div>
	</div>
</template>
<script>
	import { ref, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'
	import { useRoute, useRouter } from 'vue-router'

  export default {
    name: 'VisitorCount',
    props:{},
    setup(props){
      const store = useStore()
      const storeRetreivedData = ref(store.state.socket)
			const connections = storeRetreivedData.value.connections
			const interacting = ref(false)
			const route = useRoute()
			const router = useRouter()
      const internalInstance = getCurrentInstance()
      const { window } = internalInstance.appContext.config.globalProperties

			function reset () {
				optOut()
				console.log(window)
				window.location.reload()
			}
			
			// A variation derived from CursorsSignUp.vue
			const optOut = ()=> {
        localStorage.removeItem('optOut')
        localStorage.removeItem('player')
      }
      return { storeRetreivedData, connections, interacting, reset }
    }
  }
</script>
<style scoped>	.visitorCount {
	  position: absolute;
	  top: calc(50% - 0.5em);
	  right: 0;
	}  
	
	.readout, .options {
		font-size: 10px;
		line-height: 1;
		display: flex;
		flex-direction: row;
	}
		
	.badges {
		list-style-type: none;
		margin: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-right: 0.5em;
	}
	
	.badges .badge {
		background-color: #00FF00;
		height: 0.5em;
		width: 0.5em;
		border-radius: 50%;
	}

	.badges .badge>span {
		display:none;
	}

	.options {
		margin:0;
		margin-top:5px;
		padding:0;
		text-align:left;
	}
</style>
