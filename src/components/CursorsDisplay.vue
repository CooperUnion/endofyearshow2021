<template>

<div v-if="optOutStatus===false && mobile === false">
  <cursor-display :self="true" :player="player" />
  <cursor-display 
    v-for="player in playerCursors" 
    v-bind:key="player.id" 
    :player="player"  />
</div>

<cursors-sign-up />
   

</template>
<script>
  import {BadWords} from './BadWords.js'
  import { ref, onBeforeMount, computed, getCurrentInstance} from 'vue'
  import { useStore } from 'vuex'  
  import CursorDisplay from '@/components/CursorDisplay.vue'
  import CursorsSignUp from '@/components/CursorsSignUp.vue'

  export default {
    name: 'DebugCursorDisplay',
    components:{
      CursorDisplay,
      CursorsSignUp
    },
    props:{},
    setup(props){
      const internalInstance = getCurrentInstance()
      const { mobile } = internalInstance.appContext.config.globalProperties

      const player = ref({})
      const store = useStore()
      
      if (localStorage.getItem('player')){
      const playerplayer = JSON.parse(localStorage.getItem('player'))
      player.value = playerplayer
      store.dispatch('IDGenerated', player.value.id)
      store.dispatch('nameChosen', player.value)
        
      } else {
      player.value.role = "friend-cu"
      player.value.id = Math.floor(Math.random()*1000000)
      player.value.position = {x:(Math.floor(Math.random()*100)), y:(Math.floor(Math.random()*400))}
      store.dispatch('IDGenerated', player.value.id)
      player.value.name = ""
      store.dispatch('nameChosen', player.value)
      }
      
       window.onmousemove = (e) => {
        const x = ((e.clientX / window.innerWidth) * 100).toFixed(2)
        const y = e.pageY
        player.value.position = {x,y}
        store.dispatch('move', player.value)
      }

      const playerCursors = ref(store.state.socket.playerCursors)


      const hasOptedOut = computed(() => {
        console.log("running...")
       try {
          if(localStorage.getItem('optOut') && localStorage.getItem('optOut') == 'true') {
            return true
          } else {
            console.log(localStorage.getItem('optOut'))
            return false
          }
        } catch(e) {
          console.log("localStorage unavailable")
          return false
        }
      })
      return { hasOptedOut, player, store,
      playerCursors,
      mobile, 
      playerType: localStorage.getItem('player') || false,
      optOutStatus: localStorage.getItem('optOut') || false,
      democursorname: 'Peter Cooper \'83',
      roleRadio: "friend-cu" }
    },
      methods: {
        //     mouseMove(event) {
        //     console.log(event.clientX, event.clientY);
        //     // store.dispatch('client_playerCursorMove', `data from cursor movement, ${event}`)
        // },
    
    pingServer() {
      // Send the "pingServer" event to the server.
      this.$socket.client.emit('pingServer', 'PING!')
    },
     
    demoCursorNameCheck: function (){
      this.BadWords1 = new BadWords()
      const description = this.democursorname
      let isInclude = this.BadWords1.check(description)
      
      if (!isInclude){
        if (document.getElementById("democursortext").classList.contains("error")){
        document.getElementById("democursortext").classList.remove("error")
        document.getElementById("demo-cursor").classList.remove("error")
        document.getElementsByClassName('ok')[0].classList.remove("error")
        }
      document.getElementById("democursortext").innerHTML  = document.getElementById("textinput").value
      
        
      } else {
        document.getElementById("democursortext").innerHTML = "Nice try. Use another name."
        document.getElementById("democursortext").classList.add("error")
        document.getElementById("demo-cursor").classList.add("error")
        document.getElementsByClassName('ok')[0].classList.add("error")
      }
      
      if (document.getElementById("textinput").style.color!= "black"){
        document.getElementById("textinput").style.color = "black"
      }
  },
    messageNone: function(){
      this.democursorname = ""
      const description = this.democursorname
      document.getElementById("democursortext").innerHTML  = document.getElementById("textinput").value
    },
    radioChange: function(){
            function set(value, that){
      that.prevprev = value
    }
  
    
        if (this.prev === null){
          this.prev = document.getElementById("contactChoice1").value
        }
        (this.prev) ? set(this.prev, this): null;
        if (this.roleRadio !== this.prev) {
            this.prev = this.roleRadio;
        }
        
        console.log(this.roleRadio)
        document.getElementById("demo-cursor").classList.remove(this.prevprev)
        document.getElementById("democursortext").classList.remove(this.prevprev)
        document.getElementById("demo-cursor").classList.add(this.roleRadio)
        document.getElementById("democursortext").classList.add(this.roleRadio)
    
    },
    submitForm: function(player, store){
          // const player = ref({})
          
          // console.log(player)
        const completePlayer = {
          id: player.id,
          name: this.democursorname,
          role: this.roleRadio,
          position: player.position
        }
        
        window.onmousemove = (e) => {
          const x = ((e.clientX / window.innerWidth) * 100).toFixed(2)
          const y = e.pageY
          player.name = completePlayer.name
          player.role = completePlayer.role
          player.id = completePlayer.id
          player.position = {x,y}
          store.dispatch('move', player)
          localStorage.setItem('player', JSON.stringify(player))
        }
               
        // window.sessionStorage.setItem('EOYS2021TempId', completePlayer.id)
        // window.sessionStorage.setItem('EOYS2021Name', completePlayer.name)
        // window.sessionStorage.setItem('EOYS2021Role', completePlayer.role)
        player.value = completePlayer
        store.dispatch('nameChosen', completePlayer)
        
        document.getElementById("dialog").classList.add("hidden")
          
      },
      optOut: function(){
        localStorage.setItem('optOut', true)
        localStorage.setItem('player', true)
        document.getElementById("dialog").classList.add("hidden")

      }
      
    }
  }
</script>

<style scoped>
.dialog{
  width: 40vw;
  height: 80vh;
  background-color: gainsboro;
  border-radius: 5px;
  margin-left: 30vw;
  margin-right: 30vw;
  margin-top: 5vh;
  position: absolute;
}

.close-dialog{
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

#dialog {
    width: 100vw;
    height: 100vh;
    padding: 10vh;
    position: absolute;
    top: 0;
    left: 0;
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
  
  #dialogchild {
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
  
  #dialogchild::before{
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

.message{
  text-align: center;
    margin: auto;
    display: block!important;
      font-size: 24px;
    font-weight: 500;
  line-height: 32px;
  color: black;
  
}

.message2{
      font-size: 14px;
    font-weight: 500;
    line-height: 18px;
  padding-top: 10px;
  color: black;
}

.radioscontainer{
    text-align: left;
    padding: 40px;
    padding-bottom: 1.5vh;
   padding-top: 2.5vh;
    height: fit-content;
    width: fit-content;
    margin: auto;
}

.radiobutton{
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

.cancel{
padding-top: 0px;
    margin-bottom: 0px;
    padding-bottom: 0px;
    /* margin-top: 5px; */
    background-color: transparent;
    color: black;
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    cursor: pointer;
}

label {
  margin-bottom: 1vh;
  margin-right: 15px;
  line-height: 32px;
      font-size: 14px;
    font-weight: 500;
    line-height: 18px;
}

input {
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

#textinput{
    position: relative;
    width: 300px;
    margin: auto;
    border-radius: 10px;
    margin-top: 1.3vh;
    height: 40px;
    background-color: white;
    border: 2px solid black;
    text-align: center;
      font-size: 14px;
    font-weight: 500;
    line-height: 18px;
}

input:checked {
  border: 6px solid black;
}

button,
legend {
  color: white;
  background-color: black;
  padding: 5px 10px;
  border-radius: 0;
  border: 0;
  font-size: 14px;
}

button:hover,
button:focus {
  color: #999;
}

button:active {
  background-color: white;
  color: black;
  outline: 1px solid black;
}
  
  
   .demofriend {
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

.demofriend::before{
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

.demofriend .name {
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
    font-weight: 500;
    
}

.cursordemo{
  width: fit-content;
  height: fit-content;
  margin:auto;
}

.demo-cursor{
  position: relative;
    height: 0px;
    width: fit-content;
    margin: auto;
    margin-bottom: 8vh!important;
    margin-left: -20px;
}

#demo-cursor{
   transition: background-color 0.2s linear;
  max-width: unset;
}

#democursortext{
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
    padding-bottom: 6px;
    padding-top: 5.5px;
    /* padding: 5px; */
    border-radius: 20px;
    font-size: 14px;
    font-family: Epilogue, Avenir, Helvetica, Arial, sans-serif;
    font-weight: 500;
}

.ok{
  transition: background-color 0.2s linear;
}

.yourcursorspan{
  margin-bottom: 1vh;
      font-size: 18px;
    font-weight: 500;
}

.demo-cursor::before{
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
  
  .name .name-demo::before{
  display:none;
}
  
  .friend-cu{
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

.alumnus{
  color: black;
  background-color: #9DE3B1;
}

.faculty-staff{
  color: black;
  background-color: #FFD480;
}

.current-student{
    color: black;
  background-color: #C7B9FF;
}

  
@media only screen and (max-width: 600px) {

   #dialog {
      width: calc(100vw);
      
/*       margin: auto; */
      margin-left: 0vw;
/*       border: thin solid black; */
/*       padding: 70px; */
/*       background: gainsboro; */
      border-radius: 10px;
      text-align: center;
    }
  
     #dialogchild {
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
  
  #textinput{
    width: 40vw;
    
  }
  
  .ok{
    width: 40vw;
  }
  
  .radioscontainer{
    padding: 0px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .close-dialog{
    margin-right: 0px;
    margin-top: -5vh;
    margin-left: 29vw;
    /* margin-bottom: 800px; */
    position: absolute;
  }
  
  }
  
  
  @media only screen and (max-width: 400px) {

   #dialog {
      width: calc(100vw);
      
/*       margin: auto; */
      margin-left: 0vw;
/*       border: thin solid black; */
/*       padding: 70px; */
/*       background: gainsboro; */
      border-radius: 10px;
      text-align: center;
    }
  
     #dialogchild {
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
    
    .message {
    line-height: 6vw;
    font-size: 5vw;
    }
    
    .message2 {
    line-height: 3.2vw;
    font-size: 2.8vw;
    }

  }
</style>