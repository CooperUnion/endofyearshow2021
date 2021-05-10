<template>
  <ul id="areanav" class="nav-list">
    <li v-for="item in items" :key="item"><router-link :to="item.url">{{item.name}}</router-link></li>
  </ul>
</template>

<script>
  export default {
    name: 'NavList',
    props: {
      items: Array,
    }
  }
</script>

<style scoped>
</style>
