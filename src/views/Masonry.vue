<template>
  <main>
    <h1 @click="loadPosts()">test loading individual post page</h1>

    <code>{{$route.params.post}}</code>
    
    <p v-if="loading">loading...</p>
    <div v-else>
      
      <div v-masonry="containerId" transition-duration="0.3s" item-selector=".item" column-width=".post">
        <div v-masonry-tile class="item" v-for="item in items" v-bind:key="item.id">
          <!-- block item markup -->
           <div class="post">

              <a :href="item.assets.preview.source_url">
                <img :src="item.assets.preview.thumbnail.source_url" />
              </a>
              <ul class="post-info">
                <li class="title">{{item.title}}</li>
                <li class="name">{{item.author.formatted}}</li>
                <li class="tags">{{item.taxonomy.tags}}</li>
              </ul>
<!--               <ul style="display: none;">
                <li>id: <a :href="item.route">{{item.id}}</a></li>
                <li>title: {{item.title}}</li>
                <li>type: {{item.type}}</li>
                <li>author: {{item.author.formatted}}</li>
                <li>tags: {{item.taxonomy.tags}}</li>
                <li>description: {{item.meta.description}}</li>
                <li>url: <a :href="item.assets.url">{{item.assets.url}}</a></li>
                <li>high-res: <a :href="item.assets.preview.source_url">link</a></li>
              </ul> -->
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

  export default {
    components: {
      // VueMasonryWall
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
 
  .post {
    width: 200px;
    border: 1px solid transparent;
    margin: 24px;
  }
  
  .post a {
    display: block;
    background-color: gainsboro;
  }

  .post a img {
    width: 100%;
  }
  
  .post-info {
    font-size: 20px;
    line-height: 1;
    margin-top: 0.5em;
  }

  .post-info .title {
    font-weight: 700;
  }

  
</style>