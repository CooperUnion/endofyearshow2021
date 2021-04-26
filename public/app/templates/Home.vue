<template>
  <main>
    <code>home debug info: {{path}}</code>
<!--     <masthead></masthead> -->
    <!-- <tiles :categories="categories" class="tiles"></tiles> -->
    <p v-if="loading">loading...</p>
    <ul>
      <li class="post" v-for="post in posts">
        
        <post :post="post"></post>
    
      </li>  
    </ul>
  </main>     
</template>

<script>
  /* global httpVueLoader */

  // import {Tiles} from '/components/tiles.js'
  // const Masthead = httpVueLoader('/components/masthead.vue')
  const Post = httpVueLoader('/app/components/post.vue')


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
        this.posts = await fetch('/api/posts').then(res=>res.json())
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
</style>