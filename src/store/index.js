import { createStore } from 'vuex'

const activeArea = new Set()
const activeGlobalNav = ''
const activeScrimId = 0
const areaCount = new Map()

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

