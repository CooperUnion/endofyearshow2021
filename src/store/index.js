import { createStore } from 'vuex'

const activeArea = new Set()
const activeGlobalNav = ''

export default createStore({
  state() {
    return {
      activeArea,
      activeGlobalNav
    }
  },
  mutations: {
    activateArea(state, areaItem) {
      state.activeArea.add(areaItem)
    },
    deactivateArea(state, areaItem) {
      state.activeArea.delete(areaItem)
    },
    setGlobalNav(state, globalNavItem) {
      state.activeGlobalNav = globalNavItem
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

