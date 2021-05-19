<template>
  <span :class="['tag', { expanded: expanded }]"><small v-if="expanded">{{label}}</small></span>
</template>

<script>
export default {
  name: 'TagDot',
  props: {
    expanded: Boolean,
    label: String
  }  
}
</script>

<style scoped>
  
  .tag {
    display: block;
    height: 16px;
    width: 16px;
    overflow: hidden;
    text-indent: -999vw;
    border-radius: 50%;
    background-color: #eee;
    position: relative;
    box-sizing: border-box;
    color: #000;
  }  
    

  .tag.expanded {
    width: auto;
    height: 1em;
    overflow: auto;
    text-indent: 0;
    border-radius: 0.5em;
    color: inherit;
    line-height: 1;
 }  
    

  .tag[data-tagname="view-all"] {
    background-color: #000;
    fill: white;
    color: #fff;
 }  

  .tag[data-tagname="animation"] {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  

  .tag[data-tagname="audiovisual"] {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  

  .tag[data-tagname="design"] {
    background-color: #ff0000;
  }  

  .tag[data-tagname="drawing"] {
    background-color: #bd00ff;
  }  

  .tag[data-tagname="film"] {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  

  .tag[data-tagname="graphic-design"] {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;

  }  

  .tag[data-tagname="installation"] {
    background-color: #0000ff;
    fill: white;
    color: #fff;
 }  

  .tag[data-tagname="interactive"] {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  
  
  .tag[data-tagname="motion-graphics"] {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  
  
  .tag[data-tagname="painting"] {
    background-color: #06a9ff;
  }  

  .tag[data-tagname="performance"] {
    background-color: #00ffff;
  }  

  .tag[data-tagname="photography"] {
    background-color: #00ff00;
  }  

  .tag[data-tagname="printmaking"] {
    background-color: #deff10;
  }  

  .tag[data-tagname="sculpture"] {
    background-color: #ffff00;
  }  

  .tag[data-tagname="sound-art"] {
    background-color: #ffa500;
  }  

  .tag[data-tagname="video"] {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  

  .tag[data-tagname="website"] {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  

</style>

