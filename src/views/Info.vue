<template>
  <global-nav :items="globalNavItems" :themeDark="true" />

   <main>    
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
  setup(){
    const internalInstance = getCurrentInstance()
    const { api_endpoint, mobile } = internalInstance.appContext.config.globalProperties
    return {globalNavItems}
  }
}
</script>