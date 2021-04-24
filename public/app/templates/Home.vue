<template>
  <main>
<!--     <code>home debug info: {{path}}</code> -->
<!--     <masthead></masthead> -->
    <!-- <tiles :categories="categories" class="tiles"></tiles> -->
    <h1>
      hi
  </h1>
  </main>     
</template>

<script>
  /* global httpVueLoader */

  // import {Tiles} from '/components/tiles.js'
  // const Masthead = httpVueLoader('/components/masthead.vue')
  // const Tiles = httpVueLoader('/components/tiles.vue')


  module.exports = {
    components: {
      // Masthead,
      // Tiles
    },
    data() {
      return {
        loading: true,
        categories: []
      }
    },
    methods:{
      async init(){
        const res = await fetch('https://eoys-client-2020.glitch.me/categories')
        const data = await res.json()
        //moved upstream to the api
        // this.categories = data.map((datum)=>{
        //   datum.url = `https://eoys-vue-client-router.glitch.me/category/${datum.slug}`
        //   datum.path = `/category/${datum.slug}`
        //   return datum
        // })
        this.categories = data
        this.loading = false  
        // console.log("from Home.js", this.$route.params, this.categories)
        
      }
    },
    mounted: async function () {
      console.log("hi")
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
/*     background-image: url(https://cdn.glitch.com/1ddf0756-3e11-469e-97f4-3ee8ac80c2ed%2F191024-023-Mario%20Morgado%20small.jpg?v=1595469103959); */
    background-image: url(https://cdn.glitch.com/1ddf0756-3e11-469e-97f4-3ee8ac80c2ed%2Fcu5.gif?v=1595984870620);
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100vh;
  }
</style>