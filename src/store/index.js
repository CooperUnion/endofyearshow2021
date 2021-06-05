import { createStore } from 'vuex'

const activeArea = new Set()
const activeGlobalNav = ''
const activeScrimId = 0


const socket = { 
  state() {
    return {
      message: {message: undefined, origin: undefined},
      cursors: {cursors: undefined, origin: undefined},
      system_message: {message: undefined, origin: undefined}
    }
  },
  mutations: {
    SOCKET_USER_MESSAGE(state, message) {
      state.message = {message, origin: 'socket'}
      console.log("socketusermessagemutationMUTATION", message)
    },
    CLIENT_USER_MESSAGE(state, message) {
      state.message = {message, origin: 'client'}
      console.log("clientusermessagemutationMUTATION", message)
    },
    SOCKET_SYSTEM_MESSAGE(state, message) {
      state.system_message = {message, origin: 'system'}
      console.log("statesystemmessagemutationMUTATION", message)
    }
    
    CLIENT_PLAYER_CURSOR_MOVE(state, message)
    
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
    
    client_playerCursorMove({ dispatch, commit }, message) {
    commit('CLIENT_PLAYER_CURSOR_MOVE', message);
    console.log("client player cursor move", message)
  
},
    
    socket_connectedMessage({ dispatch, commit }, message) {
      commit("SOCKET_CONNECTED_MESSAGE", message);
      console.log("socket connected!", message)
      
    }
    
    // socket on connection (socket connections number)
    // socket init 
    // socket client cursor move
    // socket otherclient cursor move 
    // socket disconnect (byefriend)
    // socket nameupdate 
    // socket newfriend
  }
}

export default createStore({
  state() {
    return {
      activeArea,
      activeGlobalNav,
      activeScrimId
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
    }
    
  },
  // getters: {
  //   currentAreaState: (state) => {
  //     return (navItem) => {
  //       return state.activeArea.has(navItem)
  //     }
  //   }
  // },
  actions: {
  },
  modules: {
    socket
  }
})



