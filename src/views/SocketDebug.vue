<template>
  <h1>
    SocketDebug
  </h1>
  <ul>
    <li>
      <b @click="dump()">dump vuex</b>
    </li>
    <li>
      <b @click="send()">send test</b>
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
      
      const send = ()=>{
        // store.commit('...', 'test message from vue')
        store.dispatch('socket_sendMessage', 'data from vue client')
        console.log("send hit")
      }      
      
    return {message, dump, send}
  }
}
</script>