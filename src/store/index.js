import { createStore } from 'vuex'

const activeNav = new Set()

export default createStore({
  state() {
    return {
      activeNav
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
  // getters: {
  //   currentNavState: (state) => {
  //     return (navItem) => {
  //       return state.activeNav.has(navItem)
  //     }
  //   }
  // },
  actions: {
  },
  modules: {
  }
})
