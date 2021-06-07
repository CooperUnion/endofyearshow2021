<template> 
	<div class="visitorCount">
		<span class="readout">
		<ul class="badges">
			<li class="badge"></li>
		</ul>
			{{storeRetreivedData.connections}} 
			other visitor{{storeRetreivedData.connections>1 ? 's' : ''}}
		 online</span> 
	</div>
</template>
<script>
	import { ref } from 'vue'
  import { useStore } from 'vuex'  
  
  export default {
    name: 'VisitorCount',
    props:{},
    setup(props){
      const store = useStore()
      const storeRetreivedData = ref(store.state.socket)
      return { storeRetreivedData }
    }
  }
</script>
<style scoped>	.visitorCount {
	  position: absolute;
	  top: calc(50% - 0.5em);
	  right: 0;
	}  
	
	.readout {
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
</style>
