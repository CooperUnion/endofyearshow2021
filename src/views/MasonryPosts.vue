<template>
  <main>    
    <h1 @click="loadToggle()">test loading individual post page</h1>
    
    
    <p v-if="loading">
      <loading timeout="15" />
    </p>
    <div v-else class="areasPage">
      
      <area-nav :items="areaNavItems" />
      <div 
        class="masonryBox" 
        v-masonry="containerId" 
        transition-duration="0.3s" 
        item-selector=".item" 
        column-width=".post" 
        gutter="48" 

        horizontal-order="true">
        <div v-masonry-tile class="item" v-for="item in items" v-bind:key="item.id">
          <!-- block item markup -->
            <div class="post" v-if="item.id">
              <post-media :media="item.assets.preview" />
              <post-info 
                :tags="item.taxonomy.tags"
                :title="item.title"
                :author="item.author" />
            </div>
        </div>
      </div>
      
    </div>
  </main>     
</template>

<script>
  import { ref, onBeforeMount } from "vue";
  import TagList from '@/components/TagList.vue'
  import PostInfo from '@/components/PostInfo.vue'
  import PostMedia from '@/components/PostMedia.vue'
  import Loading from '@/components/Loading.vue'
  import AreaNav from '@/components/AreaNav.vue'
  
  export default {
    components: {
      PostInfo,
      PostMedia,
      Loading,
      AreaNav
    },
    props: {
      post: String
    },
    setup(props){
      const loading = ref(true)
      const items = ref([])
      const areaNavItems = ref([
        {name:"Animation", url:"/Animation"},
        {name:"Audiovisual", url:"/Audiovisual"},
        {name:"Design", url:"/Design"},
        {name:"Drawing", url:"/Drawing"},
        {name:"Film", url:"/Film"},
        {name:"Graphic Design", url:"/Graphic Design"},
        {name:"Installation", url:"/Installation"},
        {name:"Interactive", url:"/Interactive"},
        {name:"Motion Graphics", url:"/Motion Graphics"},
        {name:"Painting", url:"/Painting"},
        {name:"Performance", url:"/Performance"},
        {name:"Photography", url:"/Photography"},
        {name:"Printmaking", url:"/Printmaking"},
        {name:"Sculpture", url:"/Sculpture"},
        {name:"Sound Art", url:"/Sound Art"},
        {name:"Video", url:"/Video"},
        {name:"Website", url:"/Website"}
      ])
         
      onBeforeMount(loadPosts)
      async function loadToggle(){
        console.log("ok...")
        loading.value = loading.value === true ? false : true
      }
      
      async function loadPosts(){
        items.value = await fetch(`https://eoys-uploader-2021.glitch.me/api/posts`).then(res=>res.json())
        loading.value = false
        console.log(items.value)
        return true
      }
      return {items, loading, loadToggle, loadPosts, areaNavItems}
    }
  }
</script>

<style scoped>
  
/*   main{
    width: 100%;
    height: 100vh;
  }
  */
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