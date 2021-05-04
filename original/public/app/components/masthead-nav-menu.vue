<template>
  <nav class="menu" v-on:click.self="toggle">
      <ul class="aligned" 
        v-bind:style="{display:this.display ? 'grid' : 'none'}"
        v-on:click="toggle">
      <li v-for="item in nav" :id="item.id"><a :href="item.path">{{item.name}}</a></li>
    </ul>
  </nav>
</template>

<script>

  let nav = [
    {name:"students", path: "/category/students"},
    {name:"projects", path: "/category/projects"},
    {name:"studios", path: "/category/studios"},
    {name:"foundation", path: "/category/foundation"},
    {name:"forum", path: "/tags/forum"},
    {name:"areas", path: "/tags/areas"},
  ]
  
  for(item of nav) {
    item.id = `nav-${item.name}`
  }
  
  module.exports = {
    data() {
      return {
        display: false,
        nav
      }
    },
    methods: {
      toggle(){
        console.log("clicked")
        this.display = (this.display) ? false : true
      }
    }
  }
  
</script>

<style scoped>
  .menu {
    --item-size: calc(var(--masthead-size)*2);
    --menu-size: 75vw;
    background-image: url(https://cdn.glitch.com/1ddf0756-3e11-469e-97f4-3ee8ac80c2ed%2Fhex-stroked.svg?v=1596814444947);
    background-repeat:no-repeat;
    background-position: right 7px center;
/*     width: var(--item-size); */
/*     height: var(--item-size); */
    width: calc(var(--item-size) * 1.25);
    height: 7vw; /* Just eyeballed, not a calculated value */
    flex: none;
    margin-top: 2px; /* Because the animated logo GIF has some padding */
    background-size: contain;
    position:relative;
    z-index:9;
  }
  
  ul {
    width: var(--menu-size);
    background-color:white;
    border: 2px solid black;
    position:absolute;
    right:0;
    margin:0;
    padding:0;
  }
  
  li {
    list-style-type:none;
/*     border: 1px solid black; */
    margin:5px;
/*     padding:5px; */
  }
  
  .aligned {
    top:0;
    display:grid;
    grid-template-areas: "a b"
                         "c d" 
                         "e f";
    width:var(--menu-size);
/*     height:var(--menu-size); */
    
    border-radius: calc(var(--item-size)/2);
    background-color:rgba(255,255,255,1);

  }
  
  .aligned a {
    display:block;  
    font-size:.9em;
    padding-top: 60px;
  }
  
  .aligned a:hover {
    background:none;
  }
  
  .aligned>li {
    width:calc(var(--item-size)*1.5);
    height:calc(var(--item-size)*1.6);
    background-repeat:no-repeat;
    background-position:center;
    background-size:45%;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    text-align:center;
  }
  
  .aligned>li#nav-students {
    grid-area: a;
    justify-self: end;
    background-image: url(https://cdn.glitch.com/1ddf0756-3e11-469e-97f4-3ee8ac80c2ed%2FeyosAsset%208.png?v=1595735414395);
  }
  
  .aligned>li#nav-projects {
    grid-area: b;
    justify-self: start;
    background-image: url(https://cdn.glitch.com/1ddf0756-3e11-469e-97f4-3ee8ac80c2ed%2FeyosAsset%2010.png?v=1595735722498);
  }
  
  .aligned>li#nav-studios {
    grid-area: c;
    justify-self: start;
    background-image: url(https://cdn.glitch.com/1ddf0756-3e11-469e-97f4-3ee8ac80c2ed%2FeyosAsset%206.png?v=1595735414497);
  }
  
  .aligned>li#nav-foundation {
    grid-area: d;
    justify-self: end;
    background-image: url(https://cdn.glitch.com/1ddf0756-3e11-469e-97f4-3ee8ac80c2ed%2Ffoundation.png?v=1593538267978);
  }
  
  .aligned>li#nav-forum {
    grid-area: e;
    justify-self: end;
    background-image: url(https://cdn.glitch.com/1ddf0756-3e11-469e-97f4-3ee8ac80c2ed%2FeyosAsset%207.png?v=1595735414365);
  }  
  
  .aligned>li#nav-areas {
    grid-area: f;
    justify-self: start;
    background-image: url(https://cdn.glitch.com/1ddf0756-3e11-469e-97f4-3ee8ac80c2ed%2FeyosAsset%209.png?v=1595735414195);
  }  
  
  
  
</style>