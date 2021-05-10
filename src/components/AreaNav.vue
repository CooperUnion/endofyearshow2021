<template>
  <ul id="areanav" class="nav-list">
    <li v-for="item in items" :key="item" :class="item.name.toLowerCase().replace(/\s+/g, '-')"><router-link :to="item.url">{{item.name}}</router-link><output>##</output></li>
  </ul>
</template>

<script>
  export default {
    name: 'areaNavItems',
    props: {
      items: Array,
    }
  }
</script>

<style scoped>
  
  .nav-list li {
    display: flex;
    margin-bottom: 1.5em;
    font-size: 16px;
    line-height: 1.5;
 }

  .nav-list li a {
    color: #000;
    font-weight: 700;
    display: inline-block;
  }


  .nav-list li output {
    color: #999;
    margin-left: 0.25em;
    font-size: 16px;
    line-height: 1.5;
    font-style: normal;
  }


  .nav-list li:before {
  	content: "";
  	display: inline-block;
    height: 24px;
    width: 24px;
    overflow: hidden;
    text-indent: -999vw;
    border-radius: 50%;
    background-color: #eee;
    margin-right: 12px;
  }  

  .nav-list li.animation:before {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;

  }  

  .nav-list li.audiovisual:before {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  

  .nav-list li.design:before {
    background-color: #ff0000;
  }  

  .nav-list li.drawing:before {
    background-color: #bd00ff;
  }  

  .nav-list li.film:before {
     background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  

  .nav-list li.graphic-design:before {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;

  }  

  .nav-list li.installation:before {
    background-color: #0000ff;
  }  

  .nav-list li.interactive:before {
     background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  
  
  .nav-list li.motion-graphics:before {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  
  
  .nav-list li.painting:before {
    background-color: #06a9ff;
  }  

  .nav-list li.performance:before {
    background-color: #00ffff;
  }  

  .nav-list li.photography:before {
    background-color: #00ff00;
  }  

  .nav-list li.printmaking:before {
    background-color: #deff10;
  }  

  .nav-list li.sculpture:before {
    background-color: #ffff00;
  }  

  .nav-list li.sound art:before {
    background-color: #ffa500;
  }  

  .nav-list li.video:before {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  

  .nav-list li.website:before {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  }  



</style>

