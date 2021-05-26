<template>
  <span :class="['tag', { expanded: expanded }]">
    <small v-if="expanded">{{label}}</small>
    <svg v-if="toggle" class="toggle" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="14" height="14" viewbox="0, 0, 14, 14">
    <path d="M6,8 L6,13.018 C6,13.551 6.449,14 7,14 C7.551,14 8,13.551 8,13 L8,8 L13.018,8 C13.551,8 14,7.551 14,7 C14,6.449 13.551,6 13,6 L8,6 L8,1 C8,0.431 7.551,0 7,0 C6.449,0 6,0.449 6,1 L6,6 L1,6 C0.431,6 0,6.449 0,7 C0,7.551 0.449,8 1,8 L6,8 z" />
  </svg>
</span>
</template>

<script>
export default {
  name: 'TagDot',
  props: {
    expanded: Boolean,
    toggle: Boolean,
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
  
  .toggle {
    position: absolute;
    top: 5px;
    left: 5px;
    height: 14px;
    width: 14px;
    fill: inherit;
    display: none;
  }
    
  .tag.active .toggle {
    transform: rotate(45deg);
  }

  .tag.inactive .toggle {
    transform: rotate(0deg);
  }

  .tag:not([data-tagname="view-all"]).inactive .toggle {
    top: 3px;
    left: 3px;
  }


</style>

