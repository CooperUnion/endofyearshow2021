<template>
  <main>
    <code>home debug info: {{path}}</code>
    <h1 @click="loadPosts()">test loading individual post page</h1>

    <code>{{$route.params.post}}</code>
    
    <p v-if="loading">loading...</p>
    <div v-else>
      <p>View <a href="/app">all posts</a></p>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <div class="post">
            
            <a :href="post.assets.preview.source_url">
              <img :src="post.assets.preview.thumbnail.source_url" />
            </a>
            <pre>
              id: <a :href="post.route">{{post.id}}</a>
              title: {{post.title}}
              type: {{post.type}}
              author: {{post.author.formatted}}
              tags: {{post.taxonomy.tags}}
              description: {{post.meta.description}}
              url: <a :href="post.assets.url">{{post.assets.url}}</a>
              high-res: <a :href="post.assets.preview.source_url">{{post.assets.preview.source_url}}</a>
              <span v-if="post.type === 'video'">video: <a :href="post.assets.media.url">{{post.assets.media.url}}</a></span>
            </pre>
          </div>
        </li>
      </ul>
      
      
    </div>
  </main>     
</template>

<script>
  import { ref, onBeforeMount } from "vue";
  // import Post from 'Post.vue';
  // import quickLoad from '../js/lib/quickLoadModule.mjs'
  // import options from '../js/loadModuleOptions.js'

  export default {
    components: {
      // Post
      // Post: () => loadModule('./Post.vue', options),
    },
    props: {
      post: String
    },
    setup(props){
      const loading = ref(true)
      const posts = ref([])
            
      onBeforeMount(loadPosts)
      async function loadToggle(){
        console.log("ok...")
        loading.value = loading.value === true ? false : true
      }
      
      async function loadPosts(){
        posts.value.push(await fetch(`https://eoys-uploader-2021.glitch.me/api/posts/${props.post}`).then(res=>res.json()))  
        loading.value = false
        console.log(posts.value)
        return true
      }
      return {posts, loading, loadToggle, loadPosts}
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