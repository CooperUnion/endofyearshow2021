<template>
  <global-nav :items="globalNavItems" />

   <main>    
     
    <page-header />
    <div class="areasPage">
      
       
This is where the Projects will go

    </div>
  </main>   

</template>

<script>
  export default {
    name: 'Projects',
  export default {
    components: {
      Loading,
      GlobalNav,
      Posts,
      Project,
      AreaNav,
      PageHeader
    },
    props: {
      post: Number
    },
    setup(props){
      const loading = ref(true)
      const items = ref()
      const route = useRoute()
      const internalInstance = getCurrentInstance()
      const { api_endpoint } = internalInstance.appContext.config.globalProperties
         
      onBeforeMount(loadPosts)
      async function loadToggle(){
        console.log("ok...")
        loading.value = loading.value === true ? false : true
      }
      
      watch(() => route.params.tag, loadPosts)    
      
      async function loadPosts(){
        loading.value = true
        items.value = []

        const url = `${api_endpoint}/api/posts`
        
        items.value = await fetch(url).then(res=>res.json())
        loading.value = false
        console.log(items.value)
        return true
      }
      return {items, loading, loadToggle, loadPosts, areaNavItems, globalNavItems}
    }
  }  }
</script>

<style scoped>
</style>
