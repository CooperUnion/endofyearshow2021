<template>
  <ul id="globalnav" class="nav-list">
    <li class="nav-item">
      <router-link to="/areas">Areas</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/foundation">Foundation</router-link>
    </li>
    <li class="nav-item">
       <router-link to="/projects">Projects</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/forum">Forum</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/students">Students</router-link>
    </li>
    <li class="nav-item">
       <router-link to="/info">Info</router-link>
    </li>
  </ul>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'  

  export default {
    name: 'GlobalNav'
  },
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
      if(store.state.activeArea.has(areaItem)) {
        store.commit('deactivateArea', areaItem)
      } else {
        store.commit('activateArea', areaItem)
      }
    }

    //formats a name passed to it by replacing '-' with ' '
    const slug = (name)=>{
      return name.toLowerCase().replace(/\s+/g, '-')
    }
    return {activeArea, toggleArea, currentAreaState, slug}
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

