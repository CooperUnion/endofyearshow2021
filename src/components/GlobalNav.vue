<template>
  <ul id="globalnav" class="nav-list">
    <li v-for="item in items" :key="item" :class="['nav-item', isActiveRoute(item)]">
      <router-link :to="item.path">{{item.name}}</router-link>
    </li>
  </ul>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'  
  import { useRoute } from 'vue-router'

  export default {
    name: 'GlobalNav',
    props: {
      items: Array,
    },
    setup(props){
      const store = useStore()
      const route = useRoute()

      //returns state for all area-nav items
      const activeGlobal = store.state.activeGlobal

      const currentGlobalState = (globalItem) => {
        return activeGlobal.has(globalItem)
      }

      const isActiveRoute = (current) => {
        console.log("what is active?", current, route.name)
        return (current == route.name) ? 'active' : ''
      }
      
      //toggles areaItem state from active to inactive
      const toggleGlobal = (globalItem) => {
        if(store.state.activeGlobal.has(globalItem)) {
          store.commit('deactivateArea', globalItem)
        } else {
          store.commit('activateArea', globalItem)
        }
      }
      return {activeGlobal, toggleGlobal, currentGlobalState, isActiveRoute} //
    }
  }
    
</script>

<style scoped>
  
  .nav-list {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1.5em;
    font-size: 16px;
    line-height: 1.5;
    cursor: pointer;
 }
  
  .nav-list .nav-item + .nav-item {
    margin-left: 1.5em;
  }

  .nav-list .nav-item a {
    color: inherit;
  }

  .nav-list .active {
    background-color:red;
  }


</style>

