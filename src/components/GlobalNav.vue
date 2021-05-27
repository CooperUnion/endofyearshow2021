<template>
  <nav id="globalnav" :class="{showNav : globalnavShow}">
    <button class="globalnav-toggle" v-if="mobile" @click="toggleGlobalPanel()">☰</button>
    <div class="nav-panel">
      <button v-if="mobile" class="close" @click="toggleGlobalPanel()">close</button>
      <ul class="nav-list">
        <li v-for="item in items" :key="item" :class="['nav-item', isActiveRoute(item.name)]">
          <router-link :to="item.path">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import { ref, computed } from 'vue'
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
      const globalnavShow = ref(false)
      
      //returns state for all area-nav items
      const activeGlobal = store.state.activeGlobal

      const isActiveRoute = (current) => {
        if(current === route.name) {
          store.commit('setGlobalNav', current)
          return 'active'
        }
        
        return undefined
      }
      
      const toggleGlobalPanel = () => {
        globalnavShow.value = !globalnavShow.value
      }


      return { isActiveRoute, globalnavShow, toggleGlobalPanel }
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
  .close {
    display: none;
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
        
    .nav-panel:not(.showNav) {
      transform: translateY(-100.1vh);
    }

    .nav-list {
      font-size: 24px;
      flex-direction: column;
      text-align: left;
      padding: 0;
    }
    
    .nav-list .nav-item {
      margin-bottom: 1em;
    }


    .nav-list .nav-item + .nav-item {
      margin-left: 0;
    }
    
    .close {
      position: absolute;
      top: 30px;
      right: 36px;
      height: 48px;
      width: 48px;
      margin: 0;
      padding: 0;
      border: 1px solid #fff;
      border-radius: 50%;
      background-color: transparent;
      background-image: url('data:image/svg+xml;utf8,<svg fill="white" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path d="m9.016 40.837c.195.195.451.292.707.292s.512-.098.708-.293l14.292-14.309 14.292 14.309c.195.196.451.293.708.293.256 0 .512-.098.707-.292.391-.39.391-1.023.001-1.414l-14.278-14.294 14.277-14.293c.39-.391.39-1.024-.001-1.414-.392-.391-1.024-.391-1.414.001l-14.293 14.309-14.292-14.309c-.391-.391-1.024-.391-1.414-.001-.391.39-.391 1.023-.001 1.414l14.276 14.293-14.276 14.294c-.39.39-.39 1.024.001 1.414z"/></svg>');
      background-size: 28px 28px;
      background-repeat: no-repeat;
      background-position: center center;
      text-indent: -999vw;
      overflow: hidden;
    }
    
  }
  
</style>

