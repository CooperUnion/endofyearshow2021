<template>
  <main>
    <code>home debug info: {{path}}</code>
<!--     <masthead></masthead> -->
    <!-- <tiles :categories="categories" class="tiles"></tiles> -->
    <ul>
      <li class="post" v-for="post in posts">
        
        <img :src="post.assets.preview.thumbnail.source_url" />
        <pre>
          title: {{post.title}}
          type: {{post.type}}
          author: {{post.author.formatted}}
          tags: {{post.taxonomy.tags}}
          description: {{post.meta.description}}
          
          
        </pre>
    
      </li>  
    </ul>
  </main>     
</template>

<script>
  /* global httpVueLoader */

  // import {Tiles} from '/components/tiles.js'
  // const Masthead = httpVueLoader('/components/masthead.vue')
  // const Tiles = httpVueLoader('/components/tiles.vue')


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
  .post{
    display:flex;
  }
</style>