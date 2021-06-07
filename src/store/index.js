import { createStore } from 'vuex'

const activeArea = new Set()
const activeGlobalNav = ''
const activeScrimId = 0
const areaCount = new Map()

let playerCursor = {
  id: 0,
  role: '',
  position: {x:0, y:0},
  name: ''
}

const socket = {
  state() {
    return {
      message: {message: undefined, origin: undefined},
      playerCursor,
      playerCursors: {},
      system_message: {message: undefined, origin: undefined},
      connections: 0
    }
  },
  mutations: {
    SOCKET_INIT_START(state, data){
      state.connections = data.connections
      console.log(state.connections)
      
      const justUsers = data.friends.filter((item)=>{ return typeof item === 'object' })
      justUsers.forEach(user => state.playerCursors[user.id] = user)
    },
    SOCKET_USER_DISCONNECT(state, data){
      delete state.playerCursors[data.friend]
      state.connections = data.connections
      console.log(state.connections)
    },
    
    CLIENT_PLAYER_CURSOR_MOVE(state, data) {
    console.log(data)
    state.playerCursor = data
    // console.log("clientplayercursormove", data)
},
    SOCKET_OTHERUSER_CURSOR_MOVE(state, data){
      state.playerCursors[data.id] = data
    },
    
    SOCKET_CONNECTED_MESSAGE(state, message) {
      state.connections = message
      console.log("socket connected message ^")
    },
    CLIENT_PLAYER_ID_GENERATED(state, message) {
      console.log(message)
    },
    SOCKET_USER_NEW(state, message){
      state.playerCursors[message.data.id] = message.data
      state.connections = message.activeUsers
      console.log(state.playerCursors[message.data.id])
      console.log(state.playerCursors[message.data.id].position)
      console.log(state.connections)
    },
    USER_NAME_CHOSEN(state, message){
      console.log(state.playerCursor)
      console.log(message)
      state.playerCursor = message
      console.log(state.playerCursor)
      //needs to change the initialized data for hte player...
   
      state.playerCursor.role = message.role
      state.playerCursor.id = message.id
      state.playerCursor.position = message.position
      state.playerCursor.name = message.name
      console.log(state.playerCursor)
          
    }
    
  },
  actions: {
    socket_userMessage ({ dispatch, commit }, message) {
     commit('SOCKET_USER_MESSAGE', message);
      console.log("socketusermessageACTION", message)
    },
    client_userMessage({ dispatch, commit }, message) {
      commit('CLIENT_USER_MESSAGE', message)
      console.log("clientusermessageACTION", message)
    },
    socket_systemMessage({ dispatch, commit }, message) {
      commit('SOCKET_SYSTEM_MESSAGE', message);
      console.log("socketsystemmessageACTION", message)
    },
    
    connected({ dispatch, commit }, message) { //new connection for everyone //essentially just there to update "online" count
      console.log("socket connected2!", message)
      commit("SOCKET_CONNECTED_MESSAGE", message)
      // document.getElementById("connections").innerHTML = message.connecitons-1
    },
    nameChosen({ dispatch, commit }, message) {
      console.log("nameChosen!", message) //emit name chosen!
      console.log(message)
      commit("USER_NAME_CHOSEN", message)

      // commit("nameChosen", message)
    },
    
    byeFriend({ dispatch, commit }, message) { //to remove connections, and remove the cursor from the page (does it work properly?)
      console.log("byeFriend", message)
      commit("SOCKET_USER_DISCONNECT", message)
    },
    
    nameUpdated({ dispatch, commit }, message){ //other person's name is uodated, update cursor currently in the page
      console.log("nameUpdated", message)
      commit("SOCKET_USER_NEW", message)
    },
    newFriend({ dispatch, commit }, message){ //new cursor first connects, no name, just id
      console.log("newFriend", message)
      
    },
    init({ dispatch, commit }, data){ //fires when first chosen, but not on new pageloads? how can we make it first on new pageloads?
      
      console.log("otherusermove", data)
      commit('SOCKET_INIT_START', data)
      
    },
    socketMove({ dispatch, commit }, data){
      console.log("otherusermove", data)
      commit('SOCKET_OTHERUSER_CURSOR_MOVE', data)    
    },
    move({ dispatch, commit }, data){
      commit('CLIENT_PLAYER_CURSOR_MOVE', data)
    },
    IDGenerated({ dispatch, commit }, data){
      commit('CLIENT_PLAYER_ID_GENERATED', data)
    }

  }
}

const application = {
  state() {
    return {
      activeArea,
      activeGlobalNav,
      activeScrimId,
      areaCount
    }
  },
  mutations: {
    activateArea(state, areaItem) {
      state.activeArea.add(areaItem)
    },
    deactivateArea(state, areaItem) {
      state.activeArea.delete(areaItem)
    },
    resetAreas(state) {
      state.activeArea = new Set()
    },
    setGlobalNav(state, globalNavItem) {
      state.activeGlobalNav = globalNavItem
    },
    setActiveScrimId(state, id) {
      state.activeScrimId = id
    },
    resetActiveScrimId(state) {
      state.activeScrimId = 0
    },
    setAreaCount(state, area, count) {
      areaCount.set(area, count)
    }
  }
}

export default createStore({
  modules:{
    application,
    socket
  }
})



