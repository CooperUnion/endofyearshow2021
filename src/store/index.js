import { createStore } from 'vuex'

const activeArea = new Set()
const activeGlobal = 'home'

export default createStore({
  state() {
    return {
      activeArea,
      activeGlobal
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
      state.activeGlobal = globalItem
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

