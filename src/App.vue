<template>
  <router-view/>
</template>

<script>
  import { ref, onBeforeMount } from "vue";

  export default {
    name: 'App'
  }
</script>

<style>
  
  @import url('https://cdn.jsdelivr.net/gh/yegor256/tacit@gh-pages/tacit-css-1.5.5.min.css');
  
  body {
    padding: 0;
  }

  body.dark {
    background-color:black;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0 auto;
    max-width: 1200px;
  }
  
  main {
    width: calc(100% - 240px); 
    margin: 0 auto;
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
  
  .mainHead {
    font-size: 48px;
    text-align: left;
    text-transform: capitalize;
    margin-bottom: 48px;
  }
  
  @media screen and (max-width: 767px) {
    main {
       width: calc(100vw - 48px);
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    main {
       width: calc(100vw - 72px);
    }
  }


</style>
