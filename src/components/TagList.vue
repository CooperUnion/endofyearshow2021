<template>
  <ul class="tagList">
    <li class="tagItem" v-for="tag in tags" :key="tag">
      <tag-button :data-tagname="tag.toLowerCase().replace(/\s+/g, '-')" :expanded="expanded" />
    </li>
  </ul>
</template>

<script>
  import TagButton from '@/components/TagButton.vue'

  export default {
    components: {
      TagButton
    },
    name: 'TagList',
    props: {
      expanded: Boolean,
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
