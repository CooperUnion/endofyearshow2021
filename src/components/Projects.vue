<template>
{{items}}
</template>

<script>
  import { computed, ref, watch } from 'vue'
  import { useStore } from 'vuex'  
      
  export default {
    name: 'Projects',
    props: {
      items: Array
    }
  }
</script>

<style scoped>
  .projectsBox {
    margin: 0 auto;
  }
  
  .projectsBox .post {
    margin-bottom: 36px;
  }

  .projectsBox .post >>> img {
    display: block;
    width: auto;
    height: auto;
    max-height: 600px;
  }


  
</style>
