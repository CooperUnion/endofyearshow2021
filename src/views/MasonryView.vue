<template>
  <main>
<!--     <h1 @click="loadPosts()">test loading individual post page</h1> -->

    <code>{{$route.params.post}}</code>
    
    <p v-if="loading">loading...</p>
    <div v-else>
      <div class="masonryBox" v-masonry="containerId" transition-duration="0.3s" item-selector=".item" column-width=".post" gutter="48" fit-width="true" horizontal-order="true">
        <div v-masonry-tile class="item" v-for="item in items" v-bind:key="item.id">
          <!-- block item markup -->
            <div class="post" v-if="item.id">
              
              <template v-if="item.assets.preview">
                <a :href="item.assets.preview.source_url">
                  <img v-if="!item.assets.preview.sizes.medium_large" :src="item.assets.preview.source_url" />
                  <img v-if="item.assets.preview.sizes.medium_large" :src="item.assets.preview.sizes.medium_large.source_url" />
                </a>
              </template>

              


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
  // import VueMasonryWall from "vue-masonry-wall";

  // import Post from 'Post.vue';
  // import quickLoad from '../js/lib/quickLoadModule.mjs'
  // import options from '../js/loadModuleOptions.js'
  
  //components
  import TagList from '../components/TagList.vue'
  import PostInfo from '../components/PostInfo.vue'
  import PostMedia from '../components/PostMedia.vue'

  
  export default {
    components: {
      PostInfo,
      PostMedia
    },
    props: {
      post: String
    },
    setup(props){
      const loading = ref(true)
      const items = ref([])
            
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
      return {items, loading, loadToggle, loadPosts}
    }
  }
</script>

<style scoped>
  ul {
    list-style-type: none;
    text-align: left;
    margin: 0;
    padding: 0;
  }
  
  main{
    width: 100%;
    height: 100vh;
  }
 
  .masonryBox {
    margin: 0 auto;
  }
  
  .post {
    width: 27vw;
    min-width: 266px;
    border: 1px solid transparent;
    margin-bottom: 48px;
/*     margin: 24px; */
  }
  
  .post a {
    display: block;
    background-color: gainsboro;
  }

  .post a img {
    display: block;
    width: 100%;
  }
  
</style>