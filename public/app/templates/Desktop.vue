<template>
  <main>
    <code>Desktop debug info: {{path}}</code>
<!--     <masthead></masthead> -->
    <!-- <tiles :categories="categories" class="tiles"></tiles> -->
    <section class="fullscreen">
      <video 
        autoplay
        muted
        disablepictureinpicture>
        <!-- <source src="https://player.vimeo.com/external/441916823.sd.mp4?s=c2684470d8375c7c1c836ad7eec5c1e73d9ba655&profile_id=164" /> -->
        <source src="https://player.vimeo.com/external/441927147.hd.mp4?s=c4ec9581e43f5b73a33b37dbbbccb559ae1552bd&profile_id=175" />
        
      </video>
    </section>
  </main>     
</template>

<script>
  /* global httpVueLoader */

  // import {Tiles} from '/components/tiles.js'
  // const Masthead = httpVueLoader('/components/desktop-masthead.vue')

  module.exports = {
    components: {
      // Masthead
    },
    data() {
      return {
        loading: true,
        categories: []
      }
    },
    methods:{
      async init(){
        // const res = await fetch('https://eoys-client-2020.glitch.me/categories')
        // const data = await res.json()
        //moved upstream to the api
        // this.categories = data.map((datum)=>{
        //   datum.url = `https://eoys-vue-client-router.glitch.me/category/${datum.slug}`
        //   datum.path = `/category/${datum.slug}`
        //   return datum
        // })
        // this.categories = data
        this.loading = false  
        // console.log("from Desktop.vue", this.$route.params, this.categories)
        
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
/* https://cdn.glitch.com/1ddf0756-3e11-469e-97f4-3ee8ac80c2ed%2Ffoundation-optimized.jpg?v=1595188189272 */
  main {
    /* background-image: url(https://cdn.glitch.com/1ddf0756-3e11-469e-97f4-3ee8ac80c2ed%2F191024-023-Mario%20Morgado%20small.jpg?v=1595469103959); */
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100vh;
  }

  aside {
    position: absolute;
    bottom:0;
    right:0;
  }

  section.fullscreen {
    position: absolute;
    top:0;
    left:0;
    object-fit: fill;
    width: 100%;
    height: 100%;
    clip-path: view-box;
    z-index: 1;
  }

  .fullscreen video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    clip-path: view-box;
  }

  .fullscreen video *::-webkit-media-controls {
    display:none !important;
  }
</style>