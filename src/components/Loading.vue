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
    background-image: url(https://cdn.glitch.com/54e20d29-ecb6-4deb-b7dd-99e4bb8437d0%2FComp-13.gif?v=1621378208895);
    background-size: 100px 100px;
    width: auto;
    height: 100%;
    margin: 0 auto 33px auto;
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

