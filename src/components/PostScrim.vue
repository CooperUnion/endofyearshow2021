<template>
  <div class="post-scrim">
    <div class="scrim-contents">
      <h6 class="title">{{title}}—{{author.formatted}}</h6>
      <img :src="media.source_url" />
      <p>{{description}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PostScrim',
    props: {
      tags: Array,
      title: String,
      author: Object,
      media: Object
    }
  }
</script>

<style scoped>
  .post-scrim {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #000;
    color: #fff;
    display: flex;
    flex-direction: column;
  }
  
  .post-scrim .scrim-contents {
    margin: 48px 120px;
  }

  .post-scrim .scrim-contents img {
    max-width: 100%;
    height: auto;
  }

  
</style>
