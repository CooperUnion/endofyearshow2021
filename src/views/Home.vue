<template>
  <b>Current api_endpoint: {{api_endpoint}}</b>
  <div class="home">
    <global-nav :items="globalNavItems" />
    <img alt="Vue logo" src="../assets/logo.png" />
    <hello-world msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
  // @ is an alias to /src
  import { getCurrentInstance } from 'vue'
  import HelloWorld from '@/components/HelloWorld.vue'
  import GlobalNav from '@/components/GlobalNav.vue'
  import { globalNavItems } from '@/router/index.js'
  
  export default {
  name: 'Home',
  components: {
    HelloWorld,
    GlobalNav
  },
  setup(){
    const internalInstance = getCurrentInstance()
    const { api_endpoint } = internalInstance.appContext.config.globalProperties

    
    console.log("here", api_endpoint)
    return {globalNavItems}
  }
}
</script>