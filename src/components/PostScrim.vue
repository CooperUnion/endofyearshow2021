<template>
  <div class="post-scrim">
    <div class="scrim-shroud"></div>
    <div class="scrim-contents">
      <header class="title-block">
        <h6 class="title" v-html="title + ' — ' + author.formatted"></h6>
        <button class="close" @click="hideScrim()">close</button>
        <template v-if="assets.media.length>1">
          <span class="paginator">{{current + 1}}/{{assets.media.length}}</span>
        </template>    
      </header>
      <!-- logic for separate content types -->
      <div v-if="type==='images'" :class="['imageDeck', {'animating' : animState}, animDirection]">
        <img :src="assets.media[current].source_url" class="imgPrime" />
        <template v-if="assets.media.length>1">
          <button class="imgControl prev" @click="goPrev()">previous</button>
          <button class="imgControl next" @click="goNext()">next</button>
          <div class="ghostBox"><img :src="assets.media[getPrev()].source_url" class="ghostImg prev" /></div>
          <div class="ghostBox"><img :src="assets.media[getNext()].source_url" class="ghostImg next" /></div>
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
      
      const animState = ref(false);

      const animDirection = ref("");
      
      const hideScrim = () => {
        store.commit('resetActiveScrimId')
      }   
      
      const goNext = () => {
        animState.value = true;
        animDirection.value = "next"
        current.value = getNext()
        setTimeout(() => {
          animState.value = false
          animDirection.value = ""
        }, 1000);
      }
      
      const goPrev = () => {
        animState.value = true;
        animDirection.value = "prev"
        current.value = getPrev()
        setTimeout(() => {
          animState.value = false
          animDirection.value = ""
        }, 1000);

      }
    
      const getNext = () => {
        return (current.value + 1 > props.assets.media.length - 1) ? 0 : current.value + 1
      }
      
      const getPrev = () => {
        return (current.value - 1 < 0) ? props.assets.media.length -1 : current.value - 1
      }
            
      return {hideScrim, goNext, goPrev, current, getPrev, getNext, animState, animDirection}
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
    background-color: transparent;
    background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="48" height="48" viewbox="0, 0, 48, 48"><path d="M32.889,32.89 L15.111,15.111" fill-opacity="0" stroke="Silver" stroke-width="2" stroke-linecap="square" /><path d="M32.889,15.111 L15.111,32.89" fill-opacity="0" stroke="Silver" stroke-width="2" stroke-linecap="square" /><path d="M47,24 C47,36.703 36.703,47 24,47 C11.297,47 1,36.703 1,24 C1,11.297 11.297,1 24,1 C36.703,1 47,11.297 47,24 z" fill-opacity="0" stroke="Silver" stroke-width="2" /></svg>');
    background-size: 48px 48px;
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
  
  .ghostBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .ghostImg.prev {
    transform: translate(-100vw);
  }

  .ghostImg.next {
    transform: translate(100vw);
  }

  .paginator {
    position: absolute;
    top: 0;
    left: 0;
    font-weight: 700;
    line-height: 1;
  }

  .imgControl {
    position: absolute;
    top: 0;
    width: 48px;
    height: 100%;
    overflow: hidden;
    text-indent: -999vw;
    background-repeat: no-repeat;
    background-size: 48px auto;
    background-color: transparent;
    background-position: center center;
    margin: 0;
    padding: 0;
  }
  
  .imgControl.prev {
    left: 0;
    background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="48" height="48" viewBox="0, 0, 48, 48"><path d="M30,12 L18,24 L30,36" fill-opacity="0" stroke="Silver" stroke-width="2" stroke-linecap="square"/></svg>');
  }


  .imgControl.next {
    right: 0;
    background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="48" height="48" viewBox="0, 0, 48, 48"><path d="M18,36 L30,24 L18,12" fill-opacity="0" stroke="Silver" stroke-width="2" stroke-linecap="square"/></svg>');
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
