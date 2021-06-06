<template>
<h1>
  CursorDisplay is HERE
  </h1>
</template>

<script>
  import { ref, onBeforeMount } from "vue";
  

  export default {
    name: 'CursorDisplay',
    props: {
      
    },
    setup(props){
      const loading = ref(true)

      async function autoTimeout(){
        
        setTimeout(()=>{
          loading.value = false
        }, props.timeout * 1000)
        
      }
      onBeforeMount(autoTimeout)

      return {loading}
    }
  }
  
</script>

<style scoped>

  
</style>

