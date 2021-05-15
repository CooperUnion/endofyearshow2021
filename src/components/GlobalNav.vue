<template>
  <ul id="globalnav" class="nav-list">
    <li class="nav-item" v-for="item in items" :key="item">
      <router-link :to="item.url">{{item.name}}</router-link>
    </li>
  </ul>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'  

  export default {
    name: 'GlobalNav',
    props: {
      items: Array,
    },
    setup(props){
      const store = useStore()

      //returns state for all area-nav items
      const activeGlobal = store.state.activeGlobal

      const currentGlobalState = (globalItem) => {
        return activeGlobal.has(globalItem)
      }

      //toggles areaItem state from active to inactive
      const toggleGlobal = (globalItem) => {
        if(store.state.activeArea.has(globalItem)) {
          store.commit('deactivateArea', globalItem)
        } else {
          store.commit('activateArea', globalItem)
        }
      }
      return {activeGlobal, toggleGlobal, currentGlobalState}
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



</style>

