<template>
  <ul id="areanav" class="nav-list">
    
<!--     <b>{{activeArea}}</b> -->
    
    <li class="nav-item" >
      <tag-button data-tagname="view-all" />
      <router-link to="/areas" @click="resetAreas()">View all</router-link>
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
  import { computed, ref, watch, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'  
  import { useRoute, useRouter } from 'vue-router'  
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
      const route = useRoute()
      const router = useRouter()
      const internalInstance = getCurrentInstance()
      const { api_endpoint } = internalInstance.appContext.config.globalProperties

      const currentBaseNav = ()=>{
        const base = route.path.split('/').pop().split(',').shift()
        console.log({base})
        return base
      }
      
      // const baseNav = ref(currentBaseNav())
      
      //returns state for all area-nav items
      const activeArea = ref(store.state.activeArea)
      
      const currentAreaState = (areaItem) => {
        return activeArea.value.has(areaItem)
      }
      
      //toggles areaItem state from active to inactive
      const toggleArea = (areaItem) => {
        console.log({areaItem})
        if(activeArea.value.has(areaItem)) {
          store.commit('deactivateArea', areaItem)
        } else {
          store.commit('activateArea', areaItem)
        }
        // recomputeNav()
        const tags = Array.from(store.state.activeArea).join(',')
        router.push(`/tag/${tags}`)
      }
      
      //formats a name passed to it by replacing '-' with ' '
      const slug = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-')
      }
      
      const resetAreas = () => {
        store.commit('resetAreas')
      }
      
      const getCount = async (tags)=>{
        const url = `${api_endpoint}/api/count/tags/${tag}`
        const count = await fetch(url).then()
      }
      
      watch(() => route.params.tag, ()=>{
        // baseNav.value = currentBaseNav()
        // recomputeNav()
      })
      
      return {activeArea, toggleArea, currentAreaState, slug, resetAreas, getCount}
    }

  }
</script>

<style scoped>

  #areanav {
    width: 275px;
    list-style-type: none;
    margin: 0;
    text-align: left;
  }

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

  @media screen and (max-width: 767px) {
    #areanav {
      width: auto;
      position: absolute;
      top: 24px;
      left: 24px;
      right: 24px;
      background-color: #000;
      z-index: 1;
      padding: 18px;
      border-radius: 12px;
    }
    
    .nav-list .nav-item a {
      color: #fff;
    }
    
  }



</style>

