<template>
  <div class="headerBlock">
    <div class="titleBlock">
      <h1 class="mainHead">
        {{config.title}}
      </h1>
      <div class="mainDesc">
        {{config.body}}
      </div>
      <page-header-button v-if="config.refreshEnabled===true"/>
    </div>
    <div class="listBlock">
      <template v-if="$route.name === 'Projects'">
<!--         <ul class="projectsList">
          <li>Ana Valeria Castillos </li>
          <li>Ashlyn Guo </li>
          <li>Richard Yurewitch </li>
          <li>Ana Valeria Castillos </li>
          <li>Ashlyn Guo </li>
          <li>Richard Yurewitch</li>
        </ul> -->
      </template>      
    </div>
  </div>
</template>

<script>
  import { ref, watch } from "vue";
  import { useRoute } from 'vue-router'  
  import PageHeaderButton from '@/components/PageHeaderButton.vue'
  import pageConfig from '@/router/pageConfig.js'
  
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
      const currentRoute = ref(route.name.toLowerCase())
      
      const currentPageConfig = ref(pageConfig[currentRoute.value])
      
      const updatePageConfig = ()=>{
        currentPageConfig.value = pageConfig[currentRoute.value]
      }
      
      watch(() => route.path, ()=>{
        currentRoute.value = route.name.toLowerCase()
        updatePageConfig()
      })
      
      return {config: currentPageConfig}
    }
  }
  
</script>

<style scoped>
  .headerBlock {
    display: flex;
    flex-direction: row;
  }
  
  .titleBlock {
    width: 61%;
  }
  
  .listBlock {
    width: 39%;
    text-align: left;
  }

  .projectsList {
    list-style-type: none;
  }
  
  .mainHead {
    font-size: 48px;
    text-align: left;
    text-transform: capitalize;
    font-size: 48px;
    font-weight: 700;
    margin: 0;
  }
  
  .mainDesc {
    text-align: left;
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    margin: 48px 0 0 0;
  }
  
  .refreshButton{
    background-color: black;
    color: white;
    border-radius: 200px;
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

