<template>
  <div class="post-scrim">
    <div class="scrim-shroud"></div>
    <div class="scrim-contents">
      <header class="title-block">
        <h6 class="title" v-html="title + ' — ' + author.formatted"></h6>
        <button class="close" @click="hideScrim()">close</button>
      </header>
      <!-- logic for separate content types -->
      <div v-if="type==='images'" class="imageDeck">
        <img :src="assets.media[current].source_url" class="imgPrime" />
        <template v-if="assets.media.length>1">
          <button class="imgControl prev" @click="prev()">previous</button>
          <button class="imgControl next" @click="next()">next</button>
        </template>    
      </div>
      <div v-else-if="type==='url'">
        <img :src="assets.preview.source_url" />
        <b v-if="assets.url"><a :href="assets.url">visit site url</a></b>
      </div>   
      <div v-else-if="type==='video'">
        <video width="320" height="240" controls>
          <source :src="assets.media.vimeo.files[0].link" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <img :src="assets.preview.source_url" />
        <b v-if="assets.url"><a :href="assets.url">visit site url</a></b>
      </div>         


      <section class="meta">
        <div class="description-block">
          <p v-if="meta.description" class="description" v-html="meta.description"></p>
          <p v-if="meta.dimensions" class="dimensions" v-html="meta.dimensions"></p>
          <p v-if="meta.materials" class="materials" v-html="meta.materials"></p>      
        </div>
        <div class="labels-block"><tag-list :tags="tags" :expanded="true"/></div>
      </section>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'  
  import { useStore } from 'vuex'  
  import TagList from '@/components/TagList.vue'
  
  
  export default {
    name: 'PostScrim',
    components: {
      TagList
    },
    props: {
      assets: Array,
      tags: Array,
      title: String,
      author: Object,
      meta: Object,
      type: String
    },
    setup(props){
      const store = useStore()
      
      const current = ref(0)
      
      const hideScrim = () => {
        store.commit('resetActiveScrimId')
      }   
      
      const next = () => {
        current.value = (current.value + 1 > props.assets.media.length - 1) ? 0 : current.value + 1
        // console.log("next clicked", current.value)
      }
      
      const prev = () => {
        current.value = (current.value - 1 < 0) ? props.assets.media.length -1 : current.value - 1
        // console.log("prev clicked", current.value)
      }
      
      return {hideScrim, next, prev, current}
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
    position: relative;
  }
  
  .post-scrim .title-block .close {
    position: absolute;
    top: -24px;
    right: 0;
    height: 48px;
    width: 48px;
    margin: 0;
    padding: 0;
    border: 1px solid #fff;
    border-radius: 50%;
    background-color: transparent;
    background-image: url('data:image/svg+xml;utf8,<svg width="48" height="48" viewBox="0 0 48 48" fill="Gainsboro" xmlns="http://www.w3.org/2000/svg"><path d="M32.8895 32.8896L15.111 15.1112" stroke="Gainsboro" stroke-width="2" stroke-linecap="square"/><path d="M32.889 15.1112L15.1105 32.8896" stroke="Gainsboro" stroke-width="2" stroke-linecap="square"/><circle cx="24" cy="24" r="23" stroke="Gainsboro" stroke-width="2"/></svg>');
    background-size: 28px 28px;
    background-repeat: no-repeat;
    background-position: center center;
    text-indent: -999vw;
    overflow: hidden;
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
    width: auto;
    height: auto;
    max-height: 600px;
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
    padding-top: 3px; /* to match label spacing */
  }


  .post-scrim .scrim-contents .meta .labels-block {
    width: 50%;
  }


  .post-scrim .scrim-contents .meta .labels-block .tagList {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
  
  .imageDeck {
    display: flex;
    flex-direction: row;
    position: relative;
  }


  .imgControl {
    position: absolute;
    top: 0;
    width: 12px;
    height: 100%;
    overflow: hidden;
    text-indent: -999vw;
    background-repeat: no-repeat;
    background-size: 12px auto;
    background-color: transparent;
    background-position: center center;
    margin: 0;
    padding: 0;
  }
  
  .imgControl.prev {
    left: 0;
    background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="16.274" height="24.892" viewBox="0, 0, 16.274, 24.892"><path d="M0.91,12.227 L0.547,11.782 L0,12.227 L0.547,12.673 L0.91,12.227 z M15.011,0 L0.547,11.782 L1.274,12.673 L15.737,0.892 L15.011,0 z M0.547,12.673 L15.547,24.892 L16.274,24 L1.274,11.782 L0.547,12.673 z" fill="white"/></svg>');
  }


  .imgControl.next {
    right: 0;
    background-image: url('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="16.274" height="24.892" viewBox="0, 0, 16.274, 24.892"><path d="M15.363,12.664 L15.726,13.11 L16.274,12.664 L15.726,12.218 L15.363,12.664 z M1.263,24.892 L15.726,13.11 L15,12.218 L0.536,24 L1.263,24.892 z M15.726,12.218 L0.726,0 L0,0.892 L15,13.11 L15.726,12.218 z" fill="white"/></svg>');
  }



  @media screen and (max-width: 767px) {
    .post-scrim .scrim-contents {
      padding: 84px 36px 36px 36px;
    }
    
    .post-scrim .title-block .close {
      top: -60px;
    }
    
    .post-scrim .scrim-contents .meta {
      flex-direction: column;
    }
    
    .post-scrim .scrim-contents .meta .description-block,
    .post-scrim .scrim-contents .meta .labels-block {
      width: auto;
    }

    
  }


  
</style>
