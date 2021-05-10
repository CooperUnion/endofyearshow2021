<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> | 
    <router-link to="/masonry">masonry</router-link>
  </div>
  <div id="page">
    <sub-nav :items="navItems" />
    <router-view/>
  </div>
</template>

<script>
  import { ref, onBeforeMount } from "vue";
  import SubNav from '@/components/SubNav.vue'

  export default {
    name: 'App',
    components: {
      SubNav
    },
    setup(){
      const navItems = ref([
        {name:"link 1", url:"/link1"},
        {name:"link 2", url:"/link2"}
      ])
      
      return {navItems}
    }
  }
</script>

<style>
  
  @import url('https://cdn.jsdelivr.net/gh/yegor256/tacit@gh-pages/tacit-css-1.5.5.min.css');

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
  
  #page {
    display: flex;
    flex-direction: row;
  }
  
  #page 
  
</style>
