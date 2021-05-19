<template>
  <div class="post-scrim">
    <div class="scrim-contents">
      <h6 class="title">{{title}}—{{author.formatted}}</h6>
      <img :src="media.source_url" />
      <section class="meta">
        <div class="description-block">
          <p class="description">{{meta.description}}</p>
          <p class="dimensions">{{meta.dimensions}}</p>
          <p class="materials">{{meta.materials}}</p>      
        </div>
        <div class="labels-block"></div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PostScrim',
    props: {
      media: Object,
      tags: Array,
      title: String,
      author: Object,
      meta: Object
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
