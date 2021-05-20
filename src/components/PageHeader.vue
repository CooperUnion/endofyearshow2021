<template>
  <h1 class="mainHead">
    {{title}}
  </h1>
  <div class="mainDesc">
    {{body}}
  </div>

  <page-header-button />
</template>

<script>
  import { ref, onBeforeMount } from "vue";
  import { useRoute } from 'vue-router'  
  
  import PageHeaderButton from '@/components/PageHeaderButton.vue'

  export default {
    name: 'Pageheader',
    components: {
      PageHeaderButton
    },
    props: {
      title: String,
      body: String
    },
    setup(props){
      
      const route = useRoute()
      console.log(route.name)
      
      return {}
    }
  }
  
</script>

<style scoped>
  .mainHead {
    font-size: 48px;
    text-align: left;
    text-transform: capitalize;
    margin-bottom: 48px;
    margin-left: 96px; /* <-- tentative */
    font-family: 'Space Grotesk', sans-serif;
    font-size: 48px;
    font-weight: 700;
  }
  
  .mainDesc {
    width: 40vw;
    text-align: left;
    margin-left: 96px; /* <-- tentative */
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
  }
  
  .refreshButton{
    background-color: black;
    color: white;
    border-radius: 200px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 700;
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

