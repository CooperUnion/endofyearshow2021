<template>
  <h1>
    SocketDebug
  </h1>
  <h2>
    {{message}}
  </h2>
</template>

<script>

  import { ref } from 'vue'
  import { useStore } from 'vuex'  
  
  export default {
  name: 'SocketDebug',
  components: {
  },
  setup(){
      const store = useStore()
      const message = ref(store.state.socket.message)

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
      
      console.log(store.state.socket)
      
    return {message}
  }
}
</script>