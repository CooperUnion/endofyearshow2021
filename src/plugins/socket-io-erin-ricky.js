//https://stackoverflow.com/questions/64782385/how-to-vue3-composition-api-plugin
import { io } from 'socket.io-client'

export default {
  install: (app, { connection, store, options }) => {
    const socket = io(connection, options)
    
    console.log("from socket-io-erin-ricky", socket)
    
    app.config.globalProperties.$socket = socket

    app.provide('socket', socket)
    
    socket.on('user_message', (message)=>{
      console.log('a message was received in the plugin:' + message)
      store.dispatch('socket_userMessage', message)
    })
    
    socket.onAny((event, ...args) => {
      console.log(`plugin: got ${event}`);
    });    
    
    
  }
}