<template>
  <div class="home">
    <global-nav></global-nav>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import GlobalNav from '@/components/GlobalNav.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    GlobalNav
  }
}
</script>