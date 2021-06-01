//https://stackoverflow.com/questions/64782385/how-to-vue3-composition-api-plugin
import { io } from 'socket.io-client'

export default {
  install: (app, { connection, store, pluginOptions, socketOptions }) => {
    const socket = io(connection, socketOptions)
    
    console.log("from socket-io-erin-ricky", socket)
    
    app.config.globalProperties.$socket = socket

    app.provide('socket', socket)
    
    socket.on('user_message', (message)=>{
      console.log('a message was received in the plugin:' + message)
      store.dispatch('socket_userMessage', message)
    })
    
    socket.onAny((event, data) => {
      if(event.includes(pluginOptions.action_prefix)) {
        console.log(`plugin identified an action: ${event}, ${data}`);
      } else if (event.includes(pluginOptions.mutation_prefix)) {
        console.log(`plugin identified a mutation: ${event}, ${data}`);
      } else {
        console.log(`plugin: got ${event}`);  
      }
    });    
    
    
  }
}