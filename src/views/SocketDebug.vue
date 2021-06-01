<template>
  <h1>
    SocketDebug
  </h1>
  <ul>
    <li>
      <b @click="dump()">dump vuex</b>
    </li>
    <li>
      <b @click="test()">send test socket message</b>
    </li> 
    <li>
      <b @click="updateVuex()">send test vuex update</b>
    </li>     
  </ul>
  <h2>
    {{message}}{{status}}
  </h2>
</template>

<script>

  import { ref, computed, inject, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'  
  
  export default {
  name: 'SocketDebug',
  components: {
  },
  setup(){
    
      // const internalInstance = getCurrentInstance()
      // const { $socket } = internalInstance.appContext.config.globalProperties


      const store = useStore()
      // const message = ref(store.state.socket.message)
      const message = computed(() => store.state.socket.message)

      const status = ref('not connected')
      
      const socket = inject('socket')
      
      // console.log(socket)
      
      socket.on('init', ()=>{
        status.value = 'init'
      })
    
      socket.on('connected', ()=>{
        status.value = 'connected'
      })
    
       socket.on('user_message', (message)=>{
        status.value = 'a message was received:' + message
      })
      
      const test = async ()=>{
        
            console.log('emitting...')
            socket.emit("test update", Math.random()*1000)
        

        
        // console.log("test fired")
        // const ws = new WebSocket('wss://eoyssockets2021.glitch.me/socket.io/?EIO=3&transport=websocket', ['polling', 'WebSocket']);
        // ws.onopen = (event)=>{
        //   ws.send('42' + JSON.stringify(['hello', 'there']));
        // }
        // ws.onerror = (error)=>{
        //   console.log(error)
        // }
      }
      
      const dump = ()=>{
        console.log(store.state.socket)
      }
      
      const updateVuex = ()=>{
        store.dispatch('client_userMessage', 'data from vue client')
      }

      const send = ()=>{
        // store.commit('...', 'test message from vue')
        // store.dispatch('socket_sendMessage', 'data from vue client')
        // console.log("send hit")
        
        // $socket.client.emit('emit_method', val);
//isn't socket accessible from this.$socket.client.emit without importing it?
      }      
      
    return {message, dump, send, test, status, updateVuex}
  }
}
</script>