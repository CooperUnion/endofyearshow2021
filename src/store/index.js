import { createStore } from 'vuex'

const activeArea = new Set()

export default createStore({
  state() {
    return {
      activeArea
    }
  },
  mutations: {
    activateArea(state, navItem) {
      state.activeArea.add(navItem)
    },
    deactivateArea(state, navItem) {
      state.activeArea.delete(navItem)
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
  }
})

