<template>
  <main>
    <code>home debug info: {{path}}</code>
<!--     <masthead></masthead> -->
    <!-- <tiles :categories="categories" class="tiles"></tiles> -->
    
    <p v-if="loading">loading...</p>

    <p v-else>View <a href="/app">all posts</a></p>
    
    <ul>
      <li class="post" v-for="post in posts">
        
        <post></post>
    
      </li>  
    </ul>
  </main>     
</template>

<script>
  /* global httpVueLoader */

  // const Masthead = httpVueLoader('/components/masthead.vue')
  const Post = httpVueLoader('/components/post.vue')


  module.exports = {
    components: {
      Post
    },
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