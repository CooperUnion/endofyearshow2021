<template>
  <ul id="areanav" class="nav-list">
    
    <b>{{activeNav}}</b>
    
    <li class="nav-item" >
      <tag-button data-tagname="view-all" />
      <router-link to="/view-all">View all</router-link>
      <output>##</output>      
    </li>

    <li class="nav-item" v-for="item in items" :key="item">
      <tag-button :data-tagname="slug(item.name)" :active="currentNavState(slug(item.name))"/>
      <router-link :to="item.url" @click="toggleNav(slug(item.name))">{{item.name}}</router-link>
      <output>##</output>
    </li>
  </ul>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'  
  import TagButton from '@/components/TagButton.vue'

  export default {
    components: {
      TagButton
    },
    name: 'areaNav',
    props: {
      items: Array,
    },
    setup(props){
      const store = useStore()
      
      //returns state for all nav items
      const activeNav = store.state.activeNav
      
      const currentNavState = (navItem) => {
        return activeNav.has(navItem)
      }
      
      //toggles navItem state from active to inactive
      const toggleNav = (navItem)=>{
        if(store.state.activeNav.has(navItem)) {
          store.commit('deactivateNav', navItem)
        } else {
          store.commit('activateNav', navItem)
        }
      }
      
      //formats a name passed to it by replacing '-' with ' '
      const slug = (name)=>{
        return name.toLowerCase().replace(/\s+/g, '-')
      }
      return {activeNav, toggleNav, currentNavState, slug}
    }
  }
</script>

<style scoped>
  
  .nav-list .nav-item {
    display: flex;
    margin-bottom: 1.5em;
    font-size: 16px;
    line-height: 1.5;
    cursor: pointer;
 }

  .nav-list .nav-item a {
    color: #000;
    font-weight: 700;
    display: inline-block;
  }


  .nav-list .nav-item output {
    color: #999;
    margin-left: 0.25em;
    font-size: 16px;
    line-height: 1.5;
    font-style: normal;
  }


  .nav-list .nav-item output {
    color: #999;
    margin-left: 0.25em;
    font-size: 16px;
    line-height: 1.5;
    font-style: normal;
  }


</style>

