<template>
  <ul id="areanav" class="nav-list">
    
    <b>{{activeArea}}</b>
    
    <li class="nav-item" >
      <tag-button data-tagname="view-all" />
      <router-link to="/view-all">View all</router-link>
      <output>##</output>      
    </li>

    <li class="nav-item" v-for="item in items" :key="item">
      <tag-button :data-tagname="slug(item.name)" :active="currentAreaState(slug(item.name))"/>
      <router-link :to="item.url" @click="toggleArea(slug(item.name))">{{item.name}}</router-link>
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
    name: 'AreaNav',
    props: {
      items: Array,
    },
    setup(props){
      const store = useStore()
      
      //returns state for all area-nav items
      const activeArea = store.state.allStates.activeArea
      
      const currentAreaState = (areaItem) => {
        return activeArea.has(areaItem)
      }
      
      //toggles areaItem state from active to inactive
      const toggleArea = (areaItem)=>{
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
    text-decoration: none;
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

