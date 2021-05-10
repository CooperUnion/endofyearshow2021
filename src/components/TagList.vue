<template>
  <ul class="tagList">
    <li class="tagItem" v-for="tag in tags" :key="tag">
      <area-tag :data-tagname="tag.toLowerCase().replace(/\s+/g, '-')" />
    </li>
  </ul>
</template>

<script>
  import AreaTag from '@/components/AreaTag.vue'

  export default {
    components: {
      AreaTag
    },
    name: 'TagList',
    props: {
      tags: Array
    }
  }
</script>

<style scoped>
  .tagList {
    display: flex;
    flex-direction: row;
    list-style-type: none;
  }
  
  .tagList .tagItem + .tagItem {
    margin-left: 4px;
  }  
</style>
