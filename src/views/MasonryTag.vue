<template>
  <main>    
    <h1 @click="loadToggle()" class="mainHead">test loading individual post page</h1>
    
    
    <p v-if="loading">
      <loading :timeout="15" />
    </p>
    <div v-else class="areasPage">
      
      <area-nav :items="areaNavItems" />
      
    </div>
  </main>     
</template>

<script>
  import { ref, onBeforeMount } from "vue";
  import Loading from '@/components/Loading.vue'
  import AreaNav from '@/components/AreaNav.vue'
  import navItems from '@/router/navItems.js'
  
  export default {
    components: {
      Loading,
      AreaNav
    },
    props: {
      post: String
    },
    setup(props){
      const loading = ref(true)
      const items = ref([])
      const areaNavItems = ref(navItems)
         
      onBeforeMount(loadPosts)
      async function loadToggle(){
        console.log("ok...")
        loading.value = loading.value === true ? false : true
      }
      
      async function loadPosts(){
        
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
  
  .masonryBox {
    margin: 0 auto;
  }
  
  .post {
    width: calc(33% - 32px);
    width: 21vw;
/*     min-width: 266px; */
    border: 1px solid transparent;
    margin-bottom: 48px;
/*     margin: 24px; */
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