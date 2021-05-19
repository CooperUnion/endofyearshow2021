<template>
  <div class="post-scrim">
    <div class="scrim-shroud"></div>
    <div class="scrim-contents">
      <header class="title-block">
        <h6 class="title">{{title}}—{{author.formatted}}</h6>
        <button class="close">
  </button>
      </header>
      <img :src="media.source_url" />
      <section class="meta">
        <div class="description-block">
          <p v-if="meta.description" class="description">{{meta.description}}</p>
          <p v-if="meta.dimensions" class="dimensions">{{meta.dimensions}}</p>
          <p v-if="meta.materials" class="materials">{{meta.materials}}</p>      
        </div>
        <div class="labels-block"><tag-list :tags="tags" :expanded="true"/></div>
      </section>
    </div>
  </div>
</template>

<script>
  import TagList from '@/components/TagList.vue'
  
  export default {
    name: 'PostScrim',
    components: {
      TagList
    },
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
    color: #fff;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  
  .post-scrim .scrim-shroud {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #000;
    z-index: 0;
 }
  
  .post-scrim .title-block {
    padding: 0;
  }
  
  .post-scrim .title-block .close {
    position: absolute;
    top: 0;
    right: 0;
    height: 1em;
    width: 1em;
    margin: 0;
    padding: 0;
    border-radius: 50%;
  }

  .post-scrim .scrim-contents {
    padding: 48px 120px;
    position: relative;
    overflow: scroll;
    scrollbar-width: none; /* Firefox */
  }

  .post-scrim .scrim-contents::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
  }

  .post-scrim .scrim-contents .title {
    color: #fff;
    text-transform: unset;
    font-size: 18px;
    margin-bottom: 24px;
  }


  .post-scrim .scrim-contents img {
    display: block;
    width: 100%;
    height: auto;
  }

  .post-scrim .scrim-contents .meta {
    margin-top: 36px;
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


  .post-scrim .scrim-contents .meta .labels-block {
    width: 50%;
  }


  .post-scrim .scrim-contents .meta .labels-block .tagList {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }




  
</style>
