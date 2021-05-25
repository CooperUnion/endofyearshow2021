<template>
  <div class="post-scrim">
    <div class="scrim-shroud"></div>
    <div class="scrim-contents">
      <header class="title-block">
        <h6 class="title" v-html="title + ' — ' + author.formatted"></h6>
        <button class="close" @click="hideScrim()">close</button>
      </header>
      <!-- logic for separate content types -->
      <div v-if="type==='images'">
        <img :src="assets.media[current].source_url" />
        <div v-if="assets.media.length>1">
          <b @click="prev()">prev</b> | <b @click="next()">next</b>
        </div>    
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
      
      const next = ()=>{
        current.value = (current.value + 1 > props.assets.media.length - 1) ? 0 : current.value + 1
        // console.log("next clicked", current.value)
      }
      
      const prev = ()=>{
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
    background-image: url('data:image/svg+xml;utf8,<svg fill="white" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path d="m9.016 40.837c.195.195.451.292.707.292s.512-.098.708-.293l14.292-14.309 14.292 14.309c.195.196.451.293.708.293.256 0 .512-.098.707-.292.391-.39.391-1.023.001-1.414l-14.278-14.294 14.277-14.293c.39-.391.39-1.024-.001-1.414-.392-.391-1.024-.391-1.414.001l-14.293 14.309-14.292-14.309c-.391-.391-1.024-.391-1.414-.001-.391.39-.391 1.023-.001 1.414l14.276 14.293-14.276 14.294c-.39.39-.39 1.024.001 1.414z"/></svg>');
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




  
</style>
