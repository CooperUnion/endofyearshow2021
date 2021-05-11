<template>
  <ul id="areanav" class="nav-list">
    <li class="nav-item" >
      <tag-button data-tagname="view-all" />
      <router-link to="/view-all">View all</router-link>
      <output>##</output>      
    </li>

    <li class="nav-item" v-for="item in items" :key="item">
      <tag-button :data-tagname="item.name.toLowerCase().replace(/\s+/g, '-')" />
      <router-link :to="item.url">{{item.name}}</router-link>
      <output>##</output>
    </li>
  </ul>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'  
  import TagButton from '@/components/TagButton.vue'

  export default {
    components: {
      TagButton
    },
    name: 'areaNav',
    props: {
      items: Array,
    },
    setup(props){
      const store = useStore()
      
      
    }
  }
</script>

<style scoped>
  
  .nav-list .nav-item {
    display: flex;
    margin-bottom: 1.5em;
    font-size: 16px;
    line-height: 1.5;
    cursor: pointer;
 }

  .nav-list .nav-item a {
    color: #000;
    font-weight: 700;
    display: inline-block;
  }


  .nav-list .nav-item output {
    color: #999;
    margin-left: 0.25em;
    font-size: 16px;
    line-height: 1.5;
    font-style: normal;
  }


  .nav-list .nav-item output {
    color: #999;
    margin-left: 0.25em;
    font-size: 16px;
    line-height: 1.5;
    font-style: normal;
  }

  .nav-list .nav-item .tag {
    height: 24px;
    width: 24px;
    margin-right: 12px;
  }


</style>

