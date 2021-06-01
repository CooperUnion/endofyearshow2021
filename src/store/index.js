import { createStore } from 'vuex'
// import $socket from '@/store/socket'

const activeArea = new Set()
const activeGlobalNav = ''
const activeScrimId = 0


const application = {
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
  actions: {
  },
  modules: {
  }
}

const socket = {  state() {
    return {
      message: {message: undefined, origin: undefined}
    }
  },
  mutations: {
    SOCKET_USER_MESSAGE(state, message) {
      state.message = {message, origin: 'socket'}
    },
    CLIENT_USER_MESSAGE(state, message) {
      state.message = {message, origin: 'client'}
    }    
  },
  getters: {},
  actions: {
    socket_userMessage ({ dispatch, commit }, message) {
     commit('SOCKET_USER_MESSAGE', message);
    },
    socket_sendMessage(data) {
      $socket.client.emit('vue_sendMessage', data);
      console.log("emitted", data)
    },
    client_userMessage({ dispatch, commit }, message) {
      commit('CLIENT_USER_MESSAGE', message)
    }
  }
}

export default createStore({
  modules:{
    application,
    socket
  }
})

