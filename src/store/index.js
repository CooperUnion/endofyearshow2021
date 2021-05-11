import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      activeNav: new Set()
    }
  },
  mutations: {
    activateNav(state, nav) {
      state.activeNav.add(nav)
    },
    deactivateNav(state, nav) {
      state.activeNav.delete(nav)
    }
  },
  getters: {
    
  },
  actions: {
  },
  modules: {
  }
})
