<template>
  <h1>
    SocketDebug
  </h1>
  <ul>
    <li>
      <b @click="dump()">dump vuex</b>
    </li>
  </ul>
  <h2>
    {{message}}
  </h2>
</template>

<script>

  import { ref, computed } from 'vue'
  import { useStore } from 'vuex'  
  
  export default {
  name: 'SocketDebug',
  components: {
  },
  setup(){
      const store = useStore()
      // const message = ref(store.state.socket.message)
      const message = computed(() => store.state.socket.message)

      const dump = ()=>{
        console.log(store.state.socket)
      }
      //toggles areaItem state from active to inactive
      // const toggleArea = (areaItem) => {
      //   console.log({areaItem})
      //   if(activeArea.value.has(areaItem)) {
      //     store.commit('deactivateArea', areaItem)
      //   } else {
      //     store.commit('activateArea', areaItem)
      //   }
      //   // recomputeNav()
      //   const tags = Array.from(store.state.application.activeArea).join(',')
      //   router.push(`/tag/${tags}`)
      // }
      
    return {message, dump}
  }
}
</script>