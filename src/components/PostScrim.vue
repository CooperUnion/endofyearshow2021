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
        <div class="labels-block"><tag-list :tags="tags"/></div>
      </section>
    </div>
  </div>
</template>

<script>
  import TagList from '@/components/TagList.vue'
  
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


  .post-scrim .scrim-contents .title {
    color: #fff;
    text-transform: unset;
    font-size: 18px;
  }


  .post-scrim .scrim-contents img {
    display: block;
    width: 100%;
    height: auto;
  }

  .post-scrim .scrim-contents .meta {
    display: flex;
    flex-direction: row;
    width: auto;
  }


  .post-scrim .scrim-contents .meta .description-block {
    width: 50%;
    text-align: left;
    font-size: 18px;
    line-height: 1.333;
  }


  
</style>
