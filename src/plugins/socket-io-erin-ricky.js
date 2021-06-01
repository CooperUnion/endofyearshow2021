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
    const actionsSubscription = store.subscribeAction((action, state) => {
      console.log("subscribe action", {
        type: action.type, 
        payload: action.payload
      })

      console.log("sending back to the socket")
      socket.emit(action.type, action.payload)
    })

    // const mutationsSubscription = store.subscribe((mutation, state) => {
    //   console.log("subscribe mutation", {
    //     type: mutation.type, 
    //     payload: mutation.payload
    //   })
    // })    

    //this is an example of how we receive socket data
    // socket.on('user_message', (message)=>{
    //   console.log('plugin: a message was received:' + message)
    //   store.dispatch('socket_userMessage', message)
    // })
    
    socket.onAny((event, data) => {
      //is the incoming event a valid action?
      if(validActions.includes(event)) {
        //trigger the action
        console.log(`Event ${event} is valid, dispatching`)
        store.dispatch(event, data)
      } else {
        //otherwise, log everything
        console.log(`Event ${event} is invalid, ignoring`)
      }
    });    
    
    //provide as a global variable
    app.config.globalProperties.$socket = socket
    //provide as an injectable socket
    app.provide('socket', socket)
  }
}