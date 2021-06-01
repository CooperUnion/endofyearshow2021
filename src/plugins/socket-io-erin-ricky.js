//https://stackoverflow.com/questions/64782385/how-to-vue3-composition-api-plugin
import { io } from 'socket.io-client'
import { ref } from 'vue'

//https://next.vuex.vuejs.org/api/#subscribe
/* 
Goals:
- Listen to all socket messages
-- Pull out messages that match vuex actions or mutations
-- Fire actions or mutations with socket message payload
- Listen for vuex action or mutation changes
-- Pull out updates that should propogate back to the socket
--- Possibly filter out updates that came from a socket in the first place?
-- Fire updates as appropriate back to the socket
*/

export default {
  install: (app, { connection, store, pluginOptions, socketOptions }) => {
    const socket = io(connection, socketOptions)
    
    const validActions = Object.keys(store._actions)
    const validMutations = Object.keys(store._mutations)
    
    //these get triggered for all vuex actions
    //here is where we'll send automatic messages
    const unsubscribe = store.subscribeAction((action, state) => {
      console.log("subscribe action", action.type)
      console.log("subscribe action", action.payload)
    })

    //this is how we receive socket data
    socket.on('user_message', (message)=>{
      console.log('plugin: a message was received:' + message)
      store.dispatch('socket_userMessage', message)
    })
    
    socket.onAny((event, data) => {
      if(event.includes(pluginOptions.action_prefix)) {
        console.log(`plugin identified an action: ${event}, ${data}`);
         store.dispatch('socket_userMessage', data)
      } else if (event.includes(pluginOptions.mutation_prefix)) {
        console.log(`plugin identified a mutation: ${event}, ${data}`);
      } else {
        console.log(`plugin: got ${event}`);  
      }
    });    
    
    //provide as a global variable
    app.config.globalProperties.$socket = socket
    //provide as an injectable socket
    app.provide('socket', socket)
  }
}