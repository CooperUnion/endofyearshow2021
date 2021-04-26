<template>
  <main>
    <code>home debug info: {{path}}</code>
<!--     <masthead></masthead> -->
    <!-- <tiles :categories="categories" class="tiles"></tiles> -->
    
    <p v-if="loading">loading...</p>

    <div v-else>
      <p>View <a href="/app">all posts</a></p>
      <posts :posts="posts"></posts>          
    </div>
    
  </main>     
</template>

<script>
  /* global httpVueLoader */

  // const Masthead = httpVueLoader('/components/masthead.vue')
  const Posts = httpVueLoader('/app/components/posts.vue')


  module.exports = {
    components: {
      Posts
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
</style>