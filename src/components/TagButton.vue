<template>
  <span :class="['tag', isActive()]">
    <svg class="toggle" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="14" height="14" viewbox="0, 0, 14, 14">
      <path d="M6,8 L6,13.018 C6,13.551 6.449,14 7,14 C7.551,14 8,13.551 8,13 L8,8 L13.018,8 C13.551,8 14,7.551 14,7 C14,6.449 13.551,6 13,6 L8,6 L8,1 C8,0.431 7.551,0 7,0 C6.449,0 6,0.449 6,1 L6,6 L1,6 C0.431,6 0,6.449 0,7 C0,7.551 0.449,8 1,8 L6,8 z" />
    </svg>
  </span>

</template>

<script>
export default {
  name: 'TagButton',
  props:{
    active: Boolean
  },
  setup(props){
   
    const isActive = () => {
      return props.active ? 'active' : 'inactive'
    }
    return {isActive}
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
    cursor: pointer;
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
    
  .tag[data-tagname="view-all"] {
    background-color: #000;
    fill: white;
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

  .nav-list .nav-item .tag.active .toggle {
    transform: rotate(45deg);
  }

  .nav-list .nav-item .tag.inactive .toggle {
    transform: rotate(0deg);
  }

  .nav-list .nav-item .tag {
    height: 24px;
    width: 24px;
    margin-right: 12px;
  }

  .nav-list .nav-item:hover .tag .toggle {
    display: block; 
  }  

  .nav-list .nav-item .tag.inactive {
    background-image: none;
    background-color: #fff;
    border: 2px solid #000;
  }
  
  .nav-list .nav-item .tag.inactive .toggle {
    top: 3px;
    left: 3px;
  }


</style>

