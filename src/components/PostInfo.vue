<template>
  <ul class="post-info">
    <li class="titletags">
      <h6 class="title">{{title}}</h6>
      <tag-list :tags="tags"/>
    </li>
    <li class="name">{{author.formatted}}</li> 
  </ul>
</template>

<script>
  import TagList from './TagList.vue'

  export default {
    name: 'PostInfo',
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
 .post-info {
    font-size: 16px;
    line-height: 1;
    margin-top: 0.5em;
  }

  .post-info .titletags {
    display: flex;
    justify-content: space-between;
  }

  .post-info .title {
    color: #000;
    font-weight: 700;
    text-transform: capitalize;
    margin: 0;
  }

   .post-info .name {
    color: #000;
    margin-top: 0.25em;
  }
</style>
