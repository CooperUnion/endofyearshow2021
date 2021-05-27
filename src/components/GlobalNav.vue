<template>
  <div class="nav-panel">
     <ul id="globalnav" class="nav-list">
      <li v-for="item in items" :key="item" :class="['nav-item', isActiveRoute(item.name)]">
        <router-link :to="item.path">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
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

      const isActiveRoute = (current) => {
        if(current === route.name) {
          store.commit('setGlobalNav', current)
          return 'active'
        }
        
        return undefined
      }
      
  
      return { isActiveRoute }
    }
  }
    
</script>

<style scoped>
  
  .nav-list {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 80px 0 40px 0;
    margin: 0;
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
    font-weight: 700;
  }

  @media screen and (max-width: 767px) {
    .nav-panel {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      color: #fff;
      background-color: #000;
      z-index: 1;
      padding: 36px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
   }
     
    .nav-list {
      flex-direction: column;
      text-align: left;
    }
  .nav-list .nav-item + .nav-item {
    margin-left: 1.5em;
  }

    
  }
  
</style>

