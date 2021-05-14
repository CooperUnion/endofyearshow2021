<template>
  <ul id="globalnav" class="nav-list">
    <li class="nav-item">
      <router-link to="/areas">Areas</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/foundation">Foundation</router-link>
    </li>
    <li class="nav-item">
       <router-link to="/projects">Projects</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/forum">Forum</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/students">Students</router-link>
    </li>
    <li class="nav-item">
       <router-link to="/info">Info</router-link>
    </li>
  </ul>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'  

  export default {
    name: 'GlobalNav'
  }
</script>

<style scoped>
  
  .nav-list {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1.5em;
    font-size: 16px;
    line-height: 1.5;
    cursor: pointer;
 }
  
  .nav-list .nav-item + .nav-item {
    margin-left: 1.5em;
  }

  .nav-list .nav-item a {
    color: inherit;
  }



</style>

