<template>
  <main>
    <h1 @click="loadPosts()">test loading individual post page</h1>

    <code>{{$route.params.post}}</code>
    
    <p v-if="loading">loading...</p>
    <div v-else>
      <div class="masonryBox" v-masonry="containerId" transition-duration="0.3s" item-selector=".item" column-width=".post" gutter="48" fit-width="true" horizontal-order="true">
        <div v-masonry-tile class="item" v-for="item in items" v-bind:key="item.id">
          <!-- block item markup -->
            <div class="post">
              <template v-if="item.assets.preview">
                <a :href="item.assets.preview.source_url">
                  <img :src="item.assets.preview.source_url" />
                </a>
              </template>
              <ul class="post-info">
                <li class="titletags">
                  <h6 class="title">{{item.title}}</h6>
                  <ul class="tagList">
                    <li class="tag" :data-tagname="item" v-for="item in item.taxonomy.tags" :key="item.id">
                      {{item}}
                    </li>
                  </ul>
                </li>
                <li class="name">{{item.author.formatted}}</li> 
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
  
  .post-info {
    font-size: 16px;
    line-height: 1;
    margin-top: 0.5em;
  }

  .post-info .titletags {
    display: flex;
    justify-content: space-between;
  }

  .post-info .title {
    color: #000;
    font-weight: 700;
    text-transform: capitalize;
    margin: 0;
  }

   .post-info .name {
    color: #000;
    margin-top: 0.25em;
  }

 .post-info .tagList {
    display: flex;
    flex-direction: row;
  }
  
  .post-info .tagList .tag {
    background-color: gainsboro;
    height: 16px;
    width: 16px;
    overflow: hidden;
    text-indent: -999vw;
    border-radius: 50%;
  }  

  .post-info .tagList .tag + .tag {
    margin-left: 4px;
  }  

  .post-info .tagList .tag[data-tagname="Animation"] {
    background-color: Lavender;
  }  

  .post-info .tagList .tag[data-tagname="Audiovisual"] {
    background-color: Lavender;
  }  

  .post-info .tagList .tag[data-tagname="Sound art"] {
    background-color: #FFA500;
  }  

  .post-info .tagList .tag[data-tagname="Design"] {
    background-color: #FF0000;
  }  

  .post-info .tagList .tag[data-tagname="Drawing"] {
    background-color: #BD00FF;
  }  

  .post-info .tagList .tag[data-tagname="Film"] {
    background-color: #6C00FF;
  }  

  .post-info .tagList .tag[data-tagname="Installation"] {
    background-color: #0000FF;
  }  

  .post-info .tagList .tag[data-tagname="Installation"] {
    background-color: #0000FF;
  }  
  
  .post-info .tagList .tag[data-tagname="Motion Graphics"] {
    background-color: Lavender;
  }  

  .post-info .tagList .tag[data-tagname="Photography"] {
    background-color: #00FF00;
  }  

  .post-info .tagList .tag[data-tagname="Painting"] {
    background-color: #06A9FF;
  }  

  .post-info .tagList .tag[data-tagname="Performance"] {
    background-color: #00FFFF;
  }  

  .post-info .tagList .tag[data-tagname="Video"] {
    background-color: #6C00FF;
  }  

  .post-info .tagList .tag[data-tagname="Website"] {
    background-color: Lavender;
  }  




  
</style>