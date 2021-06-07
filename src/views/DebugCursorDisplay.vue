<template>
  <h1>
    DebugCursorDisplay
  </h1>
  <b @click="dump()">dump vuex</b>

  <cursor-display :player="player" />
  Current live data: {{player}} <br />
  Data from vuex: {{storeRetreivedData}}
</template>
<script>

  import { ref, computed, inject, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'  
  import CursorDisplay from '@/components/CursorDisplay.vue'
  
  export default {
    name: 'DebugCursorDisplay',
    components:{
      CursorDisplay
    },
    props:{
      test: String
    },
    setup(props){

      const player = ref({})
      player.value.name = "ricky"
      player.value.type = "current-student"
      player.value.id = 10
      const store = useStore()

      window.onmousemove = (e) => {
          const x = e.clientX
          const y = e.pageY
          player.value.position = {x,y}
          store.dispatch('move', player.value)
      }

      const storeRetreivedData = ref(store.state.socket)


      const dump = ()=>{
        console.log(store.state.socket)
      }

      return { player, dump, storeRetreivedData }
    }
  }
</script>