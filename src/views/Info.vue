<!--htmlhint attr-lowercase:false --> 
<template>
  <global-nav :items="globalNavItems" :themeDark="themeDark" />

   <main :class="{dark : themeDark}">    
    <page-header />
    <div class="infoPage">
      INFO
    </div>
  </main>   

</template>
<script>
  import { getCurrentInstance } from 'vue'
  import GlobalNav from '@/components/GlobalNav.vue'
  import { globalNavItems } from '@/router/index.js'
  
  export default {
  name: 'Info',
  components: {
    GlobalNav
  },
  props: {
    themeDark: Boolean
  },
  setup(){
    const internalInstance = getCurrentInstance()
    const { api_endpoint, mobile } = internalInstance.appContext.config.globalProperties
    return { globalNavItems }
  }
}
</script>

<style scoped>
  main.dark {
    color: #fff;
    background-color: #000;
  }
</style>