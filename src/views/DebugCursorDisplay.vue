<template>

  <cursor-display :player="player" />

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
      player.value.name = "ricky"
      player.value.type = "friend-cu"
      player.value.id = 10
      const store = useStore()

       window.onmousemove = (e) => {
        const x = e.clientX
        const y = e.pageY
        player.value.position = {x,y}
        store.dispatch('move', player.value)
      }

      const storeRetreivedData = ref(store.state.socket)

      return { player }
    }
  }
</script>