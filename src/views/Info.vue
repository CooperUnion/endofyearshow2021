<!--htmlhint attr-lowercase:false --> 
<template>
  <global-nav :items="globalNavItems"/>

   <main>    
    <page-header />
    <div class="infoPage">
      INFO
    </div>
  </main>   

</template>
<script>
  import { getCurrentInstance, inject } from 'vue'
  import GlobalNav from '@/components/GlobalNav.vue'
  import { globalNavItems } from '@/router/index.js'
  import PageHeader from '@/components/PageHeader.vue'

  export default {
  name: 'Info',
  components: {
    GlobalNav,
    PageHeader
  },
  props: {
    theme: String
  },
  setup(props){
    const internalInstance = getCurrentInstance()

    // const { api_endpoint, mobile } = internalInstance.appContext.config.globalProperties
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