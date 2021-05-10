<template>
  <ul class="tagList">
    <li class="tag" :data-tagname="tag" v-for="tag in tags" :key="tag">
<!--       {{tag}} -->
      <area-tag :tag="tag" />
    </li>
  </ul>
</template>

<script>
  import AreaTag from '@/components/AreaTag.vue'

  export default {
    components: {
      AreaTag
    },

    name: 'TagList',
    props: {
      tags: Array
    }
  }
</script>

<style scoped>
  .post-info .tagList {
    display: flex;
    flex-direction: row;
  }
  
/*   .post-info .tagList .tag {
    height: 16px;
    width: 16px;
    overflow: hidden;
    text-indent: -999vw;
    border-radius: 50%;
  }  

  .post-info .tagList .tag + .tag {
    margin-left: 4px;
  }  
  
  .post-info .tagList .tag {
    background-color: #eee;
  }  
 */
/*   .post-info .tagList .tag[data-tagname="Animation"] {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;

  }  

  .post-info .tagList .tag[data-tagname="Audiovisual"] {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  

  .post-info .tagList .tag[data-tagname="Design"] {
    background-color: #FF0000;
  }  

  .post-info .tagList .tag[data-tagname="Drawing"] {
    background-color: #BD00FF;
  }  

  .post-info .tagList .tag[data-tagname="Film"] {
     background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  

  .post-info .tagList .tag[data-tagname="Graphic Design"] {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;

  }  

  .post-info .tagList .tag[data-tagname="Installation"] {
    background-color: #0000FF;
  }  

  .post-info .tagList .tag[data-tagname="Interactive"] {
     background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  
  
  .post-info .tagList .tag[data-tagname="Motion Graphics"] {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  
  
  .post-info .tagList .tag[data-tagname="Painting"] {
    background-color: #06A9FF;
  }  

  .post-info .tagList .tag[data-tagname="Performance"] {
    background-color: #00FFFF;
  }  

  .post-info .tagList .tag[data-tagname="Photography"] {
    background-color: #00FF00;
  }  

  .post-info .tagList .tag[data-tagname="Printmaking"] {
    background-color: #DEFF10;
  }  

  .post-info .tagList .tag[data-tagname="Sculpture"] {
    background-color: #FFFF00;
  }  

  .post-info .tagList .tag[data-tagname="Sound Art"] {
    background-color: #FFA500;
  }  

  .post-info .tagList .tag[data-tagname="Video"] {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  

  .post-info .tagList .tag[data-tagname="Website"] {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }   */
</style>
