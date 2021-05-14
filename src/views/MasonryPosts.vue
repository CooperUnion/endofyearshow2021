<template>
 
  <global-nav />

   <main>    
    
    <div class="areasPage">
      
      <area-nav :items="areaNavItems" />
      
      <loading v-if="loading" :timeout="20" />
      <posts v-else :items="items"/>
      
    </div>
  </main>   
</template>

<script>
  import { ref, onBeforeMount, watch } from "vue";
  import { useRoute } from 'vue-router'
  
  import Loading from '@/components/Loading.vue'
  import GlobalNav from '@/components/GlobalNav.vue'
  import AreaNav from '@/components/AreaNav.vue'
  import Posts from '@/components/Posts.vue'
  import navItems from '@/router/navItems.js'
  
  export default {
    components: {
      Loading,
      GlobalNav,
      Posts,
      AreaNav
    },
    props: {
      post: Number
    },
    setup(props){
      const loading = ref(true)
      const items = ref()
      const areaNavItems = ref(navItems)
      const route = useRoute()      
         
      onBeforeMount(loadPosts)
      async function loadToggle(){
        console.log("ok...")
        loading.value = loading.value === true ? false : true
      }
      
      watch(() => route.params.tag, loadPosts)    
      
      async function loadPosts(){
        loading.value = true
        items.value = []

        const url = `https://eoys-uploader-2021.glitch.me/api/posts`
        
        items.value = await fetch(url).then(res=>res.json())
        loading.value = false
        console.log(items.value)
        return true
      }
      return {items, loading, loadToggle, loadPosts, areaNavItems}
    }
  }
</script>

<style scoped>
  
 .mainHead {
    font-size: 48px;
    text-align: left;
    text-transform: capitalize;
    margin-bottom: 48px;
  }
  
  .areasPage {
    display: flex;
    flex-direction: row;
  }
  
  .areasPage #areanav {
    width: 275px;
    list-style-type: none;
    margin: 0;
    text-align: left;
  }
  
  .areasPage .masonryBox {
    width: calc(100% - 275px);
  }

</style>