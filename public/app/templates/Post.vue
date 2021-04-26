<template>
  <main>
    <code>home debug info: {{path}}</code>
<!--     <masthead></masthead> -->
    <!-- <tiles :categories="categories" class="tiles"></tiles> -->
    
    <p v-if="loading">loading...</p>

    <p v-else>View <a href="/app">all posts</a></p>
    
    <ul>
      <li class="post" v-for="post in posts">
        
        <a :href="post.assets.preview.source_url"><img :src="post.assets.preview.thumbnail.source_url" /></a>
        <pre>
          id: {{post.id}}
          title: {{post.title}}
          type: {{post.type}}
          author: {{post.author.formatted}}
          tags: {{post.taxonomy.tags}}
          description: {{post.meta.description}}
          url: <a :href="post.assets.url">{{post.assets.url}}</a>
          high-res: <a :href="post.assets.preview.source_url">{{post.assets.preview.source_url}}</a>
          <span v-if="post.type === 'video'">video: <a :href="post.assets.media.url">{{post.assets.media.url}}</a></span>
        </pre>
    
      </li>  
    </ul>
  </main>     
</template>

<script>
  /* global httpVueLoader */

  // const Masthead = httpVueLoader('/components/masthead.vue')
  const Post = httpVueLoader('/components/post.vue')


  module.exports = {
    components: {},
    data() {
      return {
        loading: true,
        categories: [],
        posts: []
      }
    },
    methods:{
      async init(){
        this.posts = [await fetch(`/api/posts/${this.$route.params.id}`).then(res=>res.json())]
        this.loading = false         
      }
    },
    mounted: async function () {
      this.init()
    },
    computed:{
      path(){
        return this.$route.path
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