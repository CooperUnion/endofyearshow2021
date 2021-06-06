<template>
  <div class="post-info">
    <ul class="post-infolist">
      <li v-if="title">
        <h6 class="title" v-html="title"></h6>
      </li>
      <li class="name" v-if="author" v-html="author.formatted"></li> 
    </ul>
    <tag-list :tags="tags"/>
  </div>
</template>

<script>
  import { ref } from "vue";  
  import TagList from '@/components/TagList.vue'

  export default {
    name: 'PostInfo',
    props: {
      tags: Array,
      title: String,
      author: Object,
      post: Number
    },
    components: {
      TagList
    },
    setup(props){
      const itemUrl = ref(`/posts/${props.post}`)
      return {itemUrl}
    }    
  }
</script>

<style scoped>
  
  .post-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 0.5em;
    align-items: flex-start;
  }

  .post-infolist {
    list-style-type: none;
    text-align: left;
    margin: 0;
    padding: 0;   
    font-size: 16px;
    line-height: 1;
  }

  .post-infolist .title {
    color: #000;
    font-weight: 700;
    text-transform: capitalize;
    margin: 0;
  }

  .post-infolist .name {
    color: #000;
    margin-top: 0.25em;
  }
  
  .post-info .tagList {
    max-width: 80px;
  }


</style>
