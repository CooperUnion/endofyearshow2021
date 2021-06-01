//https://stackoverflow.com/questions/64782385/how-to-vue3-composition-api-plugin
import { io } from 'socket.io-client'

export default {
  install: (app, { connection, options }) => {
    const socket = io(connection, options)
    
    console.log("from socket-io-erin-ricky", socket)
    
    app.config.globalProperties.$socket = socket

    app.provide('socket', socket)
  }
}