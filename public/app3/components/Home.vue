<template>
  <main>
    <code>home debug info: {{path}}</code>
    <p v-if="loading">loading...</p>
    <div v-else>
      <p>View <a href="/app">all posts</a></p>
      <h1 @click="loadToggle">test</h1>
      <ul>
        <li v-for="post in posts">
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
 
  export default {
    props: {},
    setup(){
      const loading = ref(true)
      const posts = ref([])
      onBeforeMount(async ()=>{        
        posts.value = await fetch('/api/posts').then(res=>res.json())         
        loading.value = false
      })
      return {posts, loading}
    },
    methods:{
      async loadToggle(){
        console.log("ok...")
        loading.value = 
      }
    }
  }
</script>

<style scoped>
  main{
    background-color: gainsboro;
    width: 100%;
    height: 100vh;
  }
   .post{
    display:flex;
  }
  
  pre, pre *, p {
    font-family: "courier new"
  }
  
  pre a, p a {
    text-decoration:underline;
  }
</style>