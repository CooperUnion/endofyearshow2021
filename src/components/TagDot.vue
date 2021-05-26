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
    flex: none;
  }  

  .tag.expanded {
    width: auto;
    height: auto;
    overflow: auto;
    text-indent: 0;
    border-radius: 1em;
    line-height: 1;
    padding: 6px 24px;
    font-weight: 700;
 }  
    
  .tag[data-tagname="view-all"] {
    background-color: #000;
    fill: white;
    color: #fff;
 }  

  .tag[data-tagname="design"] {
    background-color: #ff0000;
  }  

  .tag[data-tagname="drawing"] {
    background-color: #bd00ff;
  }  


  .tag[data-tagname="film-+-video"] {
    background-color: #6C00FF;
    fill: white;
    color: #fff
  }  

  .tag[data-tagname="installation"] {
    background-color: #0000ff;
    fill: white;
    color: #fff;
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

</style>

