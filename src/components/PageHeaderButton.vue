<template>
  <button class="refreshButton">
    <img class="refreshIcon" src="https://cdn.glitch.com/d71c7c2a-c6c4-4028-9136-d224524d7374%2FrefreshButton.svg?v=1621465133463"> Refresh curation
  </button>
</template>

<script>
  // import { ref, onBeforeMount } from "vue";

  export default {
    name: 'PageHeaderButton',
    props: {
    },
    setup(props){
      

      return {}
    }
  }
  
</script>

<style scoped>
    
  .refreshButton{
    background-color: black;
    color: white;
    border-radius: 200px;
    font-size: 18px;
    font-weight: 500;
    line-height: 30px;
    width: 276px;
    height: 64px;
    margin-top: 48px;
  }
  
  .refreshIcon{
    margin-bottom: -5px;
    margin-right: 5px;
  } 
</style>

