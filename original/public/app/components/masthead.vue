<template>
  <header v-if="displayUI" id="masthead">
    <h1>
        <router-link to="/"><img src="https://cdn.glitch.com/1ddf0756-3e11-469e-97f4-3ee8ac80c2ed%2Flogo_animation.gif?v=1596816638359"></router-link>
    </h1>
<!--     <search></search> -->
    <nav-menu></nav-menu>
  </header>
</template>

<script>
  /* global httpVueLoader, store */
  // const Search = httpVueLoader('/components/masthead-search.vue')  
  const NavMenu = httpVueLoader('/components/masthead-nav-menu.vue')
  
  module.exports = {
    components: {
      // Search,
      NavMenu
    },
    data () {
      return {

      }
    },
    computed: {
      displayUI () {
        return this.$store.state.displayUI
      }
    }
  }
  
</script>

<style scoped>
header {
  display:flex;
  justify-content:space-between;
/*   align-items:center; */
/*   height: calc(var(--masthead-size)*2); */
  padding:4px 0 7px 0;
  border-bottom: 2px solid black;
  background-color:white;
}

header>h1{
  text-align:center;
/*   width: calc(100vw - (var(--masthead-size)*4)); */
  height: 100%;
/*   font-weight: 500; */
  margin: 0;
}
  
header > h1 img {
  height: auto;
  max-height: 100%;
  width: auto;
  max-width: 100%;
/*   object-fit: contain; */
  }
</style>