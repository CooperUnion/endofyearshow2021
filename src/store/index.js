import { createStore } from 'vuex'

const activeArea = new Set()
const activeGlobal = new Set()


export default createStore({
  state() {
    return {
      activeArea
    }
  },
  mutations: {
    activateArea(state, areaItem) {
      state.activeArea.add(areaItem)
    },
    deactivateArea(state, areaItem) {
      state.activeArea.delete(areaItem)
    },
    activateGlobal(state, globalItem) {
      state.activeGlobal.add(globalItem)
    },
    deactivateGlobal(state, globalItem) {
      state.activeGlobal.delete(globalItem)
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

