import { createStore } from 'vuex'

const activeArea = new Set()

export default createStore({
  state() {
    return {
      [activeArea
    }
  },
  mutations: {
    activateArea(state, navItem) {
      state.activeArea.add(navItem)
    },
    deactivateArea(state, navItem) {
      state.activeArea.delete(navItem)
    },
    activateGlobal(state, navItem) {
      state.activeGlobal.add(navItem)
    },
    deactivateGlobal(state, navItem) {
      state.activeGlobal.delete(navItem)
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

