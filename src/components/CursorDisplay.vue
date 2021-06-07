<template>
<h1>
  CursorDisplay is HERE
  </h1>
  <div id="cursorscontainer">
  </div>
</template>

<script>
  import { ref, onBeforeMount } from "vue";
  

  export default {
    name: 'CursorDisplay',
    props: {
      
    },
    setup(props){
      const loading = ref(true)

      async function autoTimeout(){
        
        setTimeout(()=>{
          loading.value = false
        }, props.timeout * 1000)
        
      }
      onBeforeMount(autoTimeout)

      return {loading}
    }
  }
  
</script>

<style scoped>
:root{
   --scrollbar-width: calc(100vw - 100%);
}

body {
  padding: 0px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
  height: 100vh;
  width: 100vw;
  margin: 0px;
}
a {
  color: #00b7ff;
}
  #cursorscontainercontainer{
        height: 100%;
    width: 100vw;
    position: relative;
    left: 0;
    top: 0;
       -webkit-filter: blur(0px);
/*     overflow: hidden; */
    pointer-events:all;
    z-index: 10;
  }
  
  #cursorscontainer {
    height: 100%;
    width: 100vw;
    position: absolute;
    left: 0;
    top: 0;
       -webkit-filter: blur(0px);
/*     overflow: hidden; */
    pointer-events:none;
  }  
  
#cursorscontainer >>> .friend {
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

#cursorscontainer >>> .friend::before{
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

#cursorscontainer >>> .friend .name {
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
    /* padding-bottom: 4px; */
    padding-top: 1.6px;
    border-radius: 20px;
    font-size: 14px;
/*     font-family: 'Space Grotesk', sans-serif; */
    font-weight: 700;
    
}
  
  #cursorscontainer >>> .demofriend {
    background-color: gainsboro;
    width: 1px;
    height: 1px;
/*   background: url("https://cdn.glitch.com/fc76c743-ed4f-40b8-8cf5-889b2f64b004%2Fcursor.png?v=1621812496190"); */
  position: absolute;
  z-index: 11;
/*   clip-path: polygon(6% 22%, 50% 30%, 94% 22%, 66% 55%, 50% 95%, 34% 56%); */
  pointer-events: none;
    transition: left 0.1s ease-out, top 0.1s ease-out;
}

#cursorscontainer >>> .demofriend::before{
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

#cursorscontainer >>> .demofriend .name {
    display: inline;
    position: relative;
    left: 19px;
    top: 12px;
    pointer-events: none;
    color: black;
    text-shadow: none;
    /* background: #000; */
    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    white-space: nowrap;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 4px;
    padding-top: 4.6px;
    border-radius: 20px;
    font-size: 14px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    
}

#cursorscontainer >>> .cursordemo{
  width: fit-content;
  height: fit-content;
  margin:auto;
}

#cursorscontainer >>> .demo-cursor{
  position: relative;
    height: 0px;
    width: fit-content;
    margin: auto;
    margin-bottom: 8vh!important;
    margin-left: -20px;
}

#cursorscontainer >>> #demo-cursor{
   transition: background-color 0.2s linear;
  max-width: unset;
}

#cursorscontainer >>> #democursortext{
   transition: background-color 0.2s linear;
      display: inline;
    position: relative;
    left: 19px;
    top: 12px;
    pointer-events: none;
    color: black;
    text-shadow: none;
    /* background: #000; */
    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    white-space: nowrap;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0px;
    padding-top: 0.5px;
    /* padding: 5px; */
    border-radius: 20px;
    font-size: 14px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
}

#cursorscontainer >>> .ok{
  transition: background-color 0.2s linear;
}

#cursorscontainer >>> .yourcursorspan{
  margin-bottom: 1vh;
      font-size: 18px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
}

#cursorscontainer >>> .demo-cursor::before{
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

#cursorscontainer >>> .friend .name::before{
  display: none;
}

#cursorscontainer >>> .name .name-demo::before{
  display:none;
}

#cursorscontainer >>> .online-users{
      padding-top: 20px;
    padding-left: 20px;
    display: block!important;
    text-align: right;
    line-height: 12px;
    font-size: 10px;
  margin-right:20px;
}
  
  #cursorscontainer >>> .online-users p{
      padding-top: 0px;
    padding-left: 0px;
    display: block!important;
    text-align: right;
    line-height: 12px;
    font-size: 10px;
      margin-top:0px;
    margin-bottom:0px;
    margin-right:20px;
}


#cursorscontainer >>> .dialog{
  width: 40vw;
  height: 80vh;
  background-color: gainsboro;
  border-radius: 5px;
  margin-left: 30vw;
  margin-right: 30vw;
  margin-top: 5vh;
  position: absolute;
}

#cursorscontainer >>> .close-dialog{
margin-right: 0px;
    margin-top: -50px;
    margin-left: 200px;
    /* margin-bottom: 800px; */
    position: absolute;
    /* right: 20px; */
    /* top: 20px;*/
  border-radius: 50px;
  height: 46px;
  width: 46px;
  background-color: white;
  border: 2px solid black;
  cursor: pointer;
  color: black;
}

#cursorscontainer >>> #dialog {
    width: 100vw;
    height: 100vh;
    padding: 10vh;
    position: absolute;
    top: 0;
    pointer-events: all;
    z-index: 10;
/*      -webkit-filter: blur(0px); */
  animation: fadeIn 2s linear;
              -webkit-animation-duration: 2s;
            animation-duration: 2s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
    }
  
  @keyframes fadeIn {
     0% {opacity: 0;}
   100% {opacity: 1;}
} 
  
  #cursorscontainer >>> #dialogchild {
    width: 400px;
    width: 400px;
    max-height: 80vh;
    margin: auto;
    margin-top: 0px;
    top: 0px;
    position: relative;
    margin-left: auto;
    /* border: thin solid black; */
    padding: 70px;
    background: #dcdcdc;
    border-radius: 10px;
    text-align: center;
    display: block;
    -webkit-filter: blur(0px);
    backdrop-filter: blur(6px);
    animation-timing-function: cubic-bezier(1,-0.01, 0.55, 0.99);
    }
  
  #cursorscontainer >>> #dialogchild::before{
/*     content: '';
    position: absolute;
    margin: 0px;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    z-index: 0; */
  }
  
    .hidden {
      display: none;
    }

#cursorscontainer >>> .message{
  text-align: center;
    margin: auto;
    display: block!important;
      font-size: 24px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
  line-height: 32px;
  color: black;
  
}

#cursorscontainer >>> .message2{
      font-size: 14px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    line-height: 18px;
  padding-top: 10px;
  color: black;
}

#cursorscontainer >>> .radioscontainer{
    text-align: left;
    padding: 40px;
    padding-bottom: 1.5vh;
   padding-top: 2.5vh;
    height: fit-content;
    width: fit-content;
    margin: auto;
}

#cursorscontainer >>> .radiobutton{
    box-sizing: border-box!important;
    margin-left: 0px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 50%;
    width: 16px!important;
    height: 16px!important;
    border: 2px solid #999;
    transition: 0.2s all linear;
    margin-right: 7px;
    position: relative;
    top: 4px;
    padding: 0;
    margin-bottom: 1vh;
}

#cursorscontainer >>> .cancel{
padding-top: 0px;
    margin-bottom: 0px;
    padding-bottom: 0px;
    /* margin-top: 5px; */
    background-color: transparent;
    color: black;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    cursor: pointer;
}


#cursorscontainer >>> div:first-of-type {
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;
}

#cursorscontainer >>> label {
  margin-bottom: 1vh;
  margin-right: 15px;
  line-height: 32px;
      font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
}

#cursorscontainer >>> input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    border: 2px solid #999;
    transition: 0.2s all linear;
    margin-right: 5px;
    position: relative;
    top: 4px;
}

#cursorscontainer >>> #textinput{
    position: relative;
    width: 300px;
    margin: auto;
    border-radius: 10px;
    margin-top: 1.3vh;
    height: 40px;
    background-color: white;
    border: 2px solid black;
    text-align: center;
      font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
}

#cursorscontainer >>> input:checked {
  border: 6px solid black;
}

#cursorscontainer >>> button,
#cursorscontainer >>> legend {
  color: white;
  background-color: black;
  padding: 5px 10px;
  border-radius: 0;
  border: 0;
  font-size: 14px;
}

#cursorscontainer >>> button:hover,
#cursorscontainer >>> button:focus {
  color: #999;
}

#cursorscontainer >>> button:active {
  background-color: white;
  color: black;
  outline: 1px solid black;
}


#cursorscontainer >>> .friend-cu{
  color: black;
background-color: #C7BFAB;
}

#cursorscontainer >>> .error{
  color: black;
  background-color: #FF6741!important;
/*   color: gainsboro; */
  pointer-events: none;
  pointer: no-drop;
}

#cursorscontainer >>> .undefined{
  color: black;
  background-color: gainsboro;
/*   color: gainsboro; */
  pointer-events: none;
  pointer: no-drop;
}

#cursorscontainer >>> .alumnus{
  color: black;
  background-color: #9DE3B1;
}

#cursorscontainer >>> .faculty-staff{
  color: black;
  background-color: #FFD480;
}

#cursorscontainer >>> .current-student{
    color: black;
  background-color: #C7B9FF;
}

#cursorscontainer >>> #connections{
  margin-right: 0px;
}


#cursorscontainer >>> .ok{
  
      background-color: black;
    color: white;
    border-radius: 200px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    width: 276px;
    height: 64px;
/*     margin-top: 48px; */
    cursor: pointer;
}



@media only screen and (max-width: 600px) {

   #cursorscontainer >>> #dialog {
      width: calc(100vw);
      
/*       margin: auto; */
      margin-left: 0vw;
/*       border: thin solid black; */
/*       padding: 70px; */
/*       background: gainsboro; */
      border-radius: 10px;
      text-align: center;
    }
  
     #cursorscontainer >>> #dialogchild {
/*       width: calc(80vw - 140px); */
      padding: 30px;
      margin: auto;
      margin-left: 0vw;
/*       border: thin solid black; */
/*       padding: 70px; */
/*       background: gainsboro; */
      border-radius: 10px;
      text-align: center;
    }
  
  #cursorscontainer >>> #textinput{
    width: 40vw;
    
  }
  
  #cursorscontainer >>> .ok{
    width: 40vw;
  }
  
  #cursorscontainer >>> .radioscontainer{
    padding: 0px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  #cursorscontainer >>> .close-dialog{
    margin-right: 0px;
    margin-top: -5vh;
    margin-left: 29vw;
    /* margin-bottom: 800px; */
    position: absolute;
  }
  
  }
  
  
  @media only screen and (max-width: 400px) {

   #cursorscontainer >>> #dialog {
      width: calc(100vw);
      
/*       margin: auto; */
      margin-left: 0vw;
/*       border: thin solid black; */
/*       padding: 70px; */
/*       background: gainsboro; */
      border-radius: 10px;
      text-align: center;
    }
  
     #cursorscontainer >>> #dialogchild {
/*       width: calc(80vw - 140px); */
/*        font-size: 1vw; */
      padding: 30px;
      margin: auto;
      margin-left: 0vw;
/*       border: thin solid black; */
/*       padding: 70px; */
/*       background: gainsboro; */
      border-radius: 10px;
      text-align: center;
    }
    
    #cursorscontainer >>> .message {
    line-height: 6vw;
    font-size: 5vw;
    }
    
    #cursorscontainer >>> .message2 {
    line-height: 3.2vw;
    font-size: 2.8vw;
    }

  }
</style>

