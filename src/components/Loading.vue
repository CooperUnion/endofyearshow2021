<template>
  <div class="loading" :class="loading === false ? 'done' : ''">
    <small class="progress">loading...</small>
    <small class="final" >No work of this type available.</small>
  </div>
</template>

<script>
  import { ref, onBeforeMount } from "vue";

  export default {
    name: 'Loading',
    props: {
      timeout: Number
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
  
  .loading {
    background-image: url(./assets/loading.gif);
    background-size: contain;
    width: 100px;
    height: 100px;
  }

  .loading>small {
    display:none;
  }

  .loading.done {
    background:none;
    width: auto;
  }

  .loading.done>small.final {
    display: block;
    padding: 5px;
  }
  
</style>

