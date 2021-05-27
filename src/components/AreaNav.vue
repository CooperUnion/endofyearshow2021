<template>
  <div id="areanav" :class="['areanavPanel', {showNav : areanavShow}]">
    <button class="apply" v-if="mobile" @click="toggleAreaPanel()">Filters</button>
    <ul class="nav-list">
      <li class="nav-item" >
        <tag-button data-tagname="view-all" :toggle="true" />
        <router-link to="/areas" @click="resetAreas()">View all</router-link>
        <output><a href="/areas" @click="resetAreas()">{{itemCount['view-all']}}</a></output>      
      </li>

      <li class="nav-item" v-for="item in items" :key="item">
        <tag-button :data-tagname="slug(item.name)" :active="currentAreaState(slug(item.name))" :toggle="true"/>
        <router-link :to="item.url" @click="toggleArea(slug(item.name))">{{item.name}}</router-link>
        <output>
          <a :href="item.url">{{itemCount[slug(item.name)]}}</a>
        </output>
      </li>
    </ul>
    <button class="apply" v-if="mobile">Apply filters</button>
  </div>    
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
      
      const itemCount = ref({})
      const allItemCount = ref()
      const areanavShow = ref(false)
      
      const currentBaseNav = () => {
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
        if(name.toLowerCase === 'film + video') {
          return 'film-+-video'
        }
        return name.toLowerCase().replace(/\s+/g, '-')
      }
      
      const resetAreas = () => {
        store.commit('resetAreas')
      }
      
      const resetAndSetArea = (areaItem) => {
        store.commit('resetAreas')
        store.commit('activateArea', areaItem)
        router.push(`/tag/${areaItem}`)
      }
      
      const toggleAreaPanel = () => {
        areanavShow.value = !areanavShow.value
      }
      

     
      const getCount = async (tags)=>{
        const api_endpoint_override = 'https://eoys-uploader-2021-stage.glitch.me'
        const url = `${api_endpoint_override}/api/count/posts/tags/${tags}`
        const {count} = await fetch(url).then(r=>r.json())
        return count
      }
      
      
      const getAllCount = async ()=>{
        const api_endpoint_override = 'https://eoys-uploader-2021-stage.glitch.me'
        const url = `${api_endpoint_override}/api/count/posts`
        const {count} = await fetch(url).then(r=>r.json())
        return count
      }

      props.items.forEach(async(item)=>{
        const tag = slug(item.name)
        const count = await getCount(tag)
        itemCount.value[tag] = count  
      })
      
      const specialNav = ['view-all']
      specialNav.forEach(async(item)=>{
        itemCount.value[item] = await getAllCount()
      })
      watch(() => route.params.tag, ()=>{
        // baseNav.value = currentBaseNav()
        // recomputeNav()
      })
      
      return {activeArea, toggleArea, currentAreaState, slug, resetAreas, resetAndSetArea, itemCount, areanavShow, toggleAreaPanel}
    }

  }
</script>

<style scoped>

  #areanav {
    width: 275px;
  }


  .nav-list {
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


  .nav-list .nav-item output a {
    color: #999;
    margin-left: 0.333em;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 100;
  }


  @media screen and (max-width: 767px) {
    #areanav {
      width: calc(100vw - 48px);
      position: fixed;
      top: 24px;
      left: 24px;
      right: 24px;
      bottom: 24px;
      background-color: #fff;
      border: 2px solid #000;
      z-index: 1;
      padding: 36px;
      border-radius: 12px;
    }
        
  }



</style>

