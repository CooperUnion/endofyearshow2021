<template>
  <div 
    v-if="player && player.position && player.position.x && player.position.y"
    class="friend" 
    :class="[player.role, {self}]"
    :style="{ 
      left: player.position.x + '%', 
      top: player.position.y+'px' }">
   <div class="name">{{player.name}}</div>
  </div>
</template>

<script>
  import { ref, onBeforeMount } from "vue";
  

  export default {
    name: 'CursorDisplay',
    props: {
      self: Boolean,
      player: Object
    },
    setup(props){
     
    }
  }
  
</script>

<style scoped>
.friend {
    background-color: gainsboro;
/*     width: 0px; */
    height: 0px;
    /* background: url(https://cdn.glitch.com/fc76c743-ed4f-40b8-8cf5-889b2f64b004%2Fcursor.png?v=1621812496190); */
    position: absolute;
    z-index: 11;
    /* clip-path: polygon(6% 22%, 50% 30%, 94% 22%, 66% 55%, 50% 95%, 34% 56%); */
    pointer-events: none;
    transition: left 0.1s ease-out, top 0.1s ease-out;
    margin-top: -5px;
    margin-left: -1px;
}
  
.friend::before{
    content:"";
  position:absolute;
  z-index:-1;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color: inherit;
    width: 24px;
  height: 24px;
/*   background: url("https://cdn.glitch.com/fc76c743-ed4f-40b8-8cf5-889b2f64b004%2Fcursor.png?v=1621812496190"); */
  position: absolute;
  z-index: 11;
  clip-path: polygon(6% 22%, 50% 30%, 94% 22%, 66% 55%, 50% 95%, 34% 56%);
  pointer-events: none;
}

.friend .name {
    display: inline;
    position: relative;
    left: 18px;
    top: 8px;
    pointer-events: none;
    color: black;
    text-shadow: none;
    /* background: #000; */
    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    white-space: nowrap;
    padding: 0px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 4px;
    padding-top: 5.6px;
    border-radius: 20px;
    font-size: 14px;
/*     font-family: 'Space Grotesk', sans-serif; */
    font-weight: 700;
    
}
  
.self.friend::before{
    display: none !important;
}
  
  .friend .name::before{
  display: none;
}

.friend-cu, .friend-cu .name{
  color: black;
background-color: #C7BFAB;
}

.error{
  color: black;
  background-color: #FF6741!important;
/*   color: gainsboro; */
  pointer-events: none;
  pointer: no-drop;
}

.undefined{
  color: black;
  background-color: gainsboro;
/*   color: gainsboro; */
  pointer-events: none;
  pointer: no-drop;
}

.alumnus, .alumnus .name{
  color: black;
  background-color: #9DE3B1;
}

.faculty-staff, .faculty-staff .name{
  color: black;
  background-color: #FFD480;
}

.current-student, .current-student .name{
    color: black;
  background-color: #C7B9FF;
}

</style>

