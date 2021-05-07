<template>
  <main>
    <code>home debug info: {{path}}</code>
    <h1 @click="loadPosts()">test loading individual post page</h1>

    <code>{{$route.params.post}}</code>
    
    <p v-if="loading">loading...</p>
    <div v-else>
      
      <vue-masonry-wall :items="items" :options="{width: 300, padding: 12}">
        <template v-slot:default="{item}">

          <div class="post">

              <a :href="item.assets.preview.source_url">
                <img :src="item.assets.preview.thumbnail.source_url" />
              </a>
              <pre>
                id: <a :href="item.route">{{item.id}}</a>
                title: {{item.title}}
                type: {{item.type}}
                author: {{item.author.formatted}}
                tags: {{item.taxonomy.tags}}
                description: {{item.meta.description}}
                url: <a :href="item.assets.url">{{item.assets.url}}</a>
                high-res: <a :href="item.assets.preview.source_url">{{item.assets.preview.source_url}}</a>
                <span v-if="item.type === 'video'">
                  video: <a :href="item.assets.media.url">{{item.assets.media.url}}</a>
                </span>
              </pre>
            </div>

        </template>
      </vue-masonry-wall>
      
    </div>
  </main>     
</template>

<script>
  import { ref, onBeforeMount } from "vue";
  import VueMasonryWall from "vue-masonry-wall";

  // import Post from 'Post.vue';
  // import quickLoad from '../js/lib/quickLoadModule.mjs'
  // import options from '../js/loadModuleOptions.js'

  export default {
    components: {
      VueMasonryWall
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
        items.value.push(await fetch(`https://eoys-uploader-2021.glitch.me/api/posts/${props.post}`).then(res=>res.json()))  
        loading.value = false
        console.log(items.value)
        return true
      }
      return {items, loading, loadToggle, loadPosts}
    }
  }
</script>

<style scoped>
  main{
    background-color: gainsboro;
    width: 100%;
    height: 100vh;
  }
 
</style>