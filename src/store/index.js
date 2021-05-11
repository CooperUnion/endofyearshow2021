import { createStore } from 'vuex'

const stateSet = new Set()

export default createStore({
  state() {
    return {
      activeNav: new Set()
    }
  },
  mutations: {
    activateNav(state, navItem) {
      state.activeNav.add(navItem)
    },
    deactivateNav(state, navItem) {
      state.activeNav.delete(navItem)
    }
  },
  getters: {
    currentNavState: (state) => {
      return (navItem) => {
        return state.activeNav.get(navItem)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
