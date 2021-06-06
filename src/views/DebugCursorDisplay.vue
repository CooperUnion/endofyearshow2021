<template>
  <h1>
    DebugCursorDisplay
  </h1>
  <b @click="dump()">dump vuex</b>

  <cursor-display />
  Current live data: {{position}} <br />
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

      const store = useStore()

      const position = ref({})

      window.onmousemove = (e) => {
          const x = e.clientX
          const y = e.pageY
          position.value = {x,y}
          store.dispatch('move', position.value)
      }

      const storeRetreivedData = ref(store.state.socket)


      const dump = ()=>{
        console.log(store.state.socket)
      }

      return { position, dump, storeRetreivedData }
    }
  }
</script>