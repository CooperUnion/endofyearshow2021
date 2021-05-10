<template>
  <ul class="post-info">
    <li class="titletags">
      <h6 class="title">{{title}}</h6>
      <tag-list :tags="tags"/>
    </li>
    <li class="name">{{author}}</li> 
  </ul>
</template>

<script>
  import TagList from './TagList.vue'

  export default {
    name: 'TagList',
    props: {
      tags: Array,
      title: String,
      author: Object
    },
    components: {
      TagList
    }
  }
</script>

<style scoped>
 
</style>
