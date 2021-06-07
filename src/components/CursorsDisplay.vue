<template>

  <cursor-display :self="true" :player="player" />
  <cursor-display 
    v-for="player in playerCursors" 
    v-bind:key="player.id" 
    :player="player"  />

</template>
<script>

  import { ref, onBeforeMount } from 'vue'
  import { useStore } from 'vuex'  
  import CursorDisplay from '@/components/CursorDisplay.vue'
  
  export default {
    name: 'DebugCursorDisplay',
    components:{
      CursorDisplay
    },
    props:{},
    setup(props){
      
      const player = ref({})
   
      player.value.role = "friend-cu"
      player.value.id = Math.floor(Math.random()*10000)
      const store = useStore()
      store.dispatch('IDGenerated', player.value.id)
      player.value.name = "ricky-"+player.value.id
      store.dispatch('nameChosen', player.value)

       window.onmousemove = (e) => {
        const x = e.clientX
        const y = e.pageY
        player.value.position = {x,y}
        store.dispatch('move', player.value)
      }

      const playerCursors = ref(store.state.socket.playerCursors)

      return { player, playerCursors }
    }
  }
</script>