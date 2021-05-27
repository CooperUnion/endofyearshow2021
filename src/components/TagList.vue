<template>
  <ul class="tagList">
    <li :class="['tagItem', {expanded: expanded}]" v-for="tag in tags" :key="tag">
      <tag-button :data-tagname="tag.toLowerCase().replace(/\s+/g, '-')" :expanded="expanded" :label="tag" :toggle="toggle" />
    </li>
  </ul>
</template>

<script>
  import TagButton from '@/components/TagButton.vue'
  import { getCurrentInstance } from 'vue'    

  export default {
    components: {
      TagButton
    },
    name: 'TagList',
    props: {
      expanded: Boolean,
      toggle: Boolean,
      tags: Array
    },
    setup(props) {
      const internalInstance = getCurrentInstance()
      const { mobile } = internalInstance.appContext.config.globalProperties      
    }
  }
</script>

<style scoped>
  .tagList {
    margin: 0;
    display: flex;
    flex-direction: row-reverse;
    list-style-type: none;
    flex-wrap: wrap;
  }
  
  .tagList .tagItem {
    margin-left: 4px;
    margin-bottom: 4px;
  }  

  .tagList .tagItem.expanded {
    margin-left: 12px;
    margin-bottom: 12px;
  }  

</style>
