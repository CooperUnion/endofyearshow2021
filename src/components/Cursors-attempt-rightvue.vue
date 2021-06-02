<template>
    <div id="cursorscontainer">
      <div class="online-users">
       <span id="connections">
        </span> <span id="othervisitors"> other visitors online</span><br>
          <p>Your name is "<span id="prompt"></span>"</p>
  <p>Your role is "<span id="role"></span>"</p>
    </div>

<!--   <p>The current time is <span id="time-stamp"></span>.</p> -->
<!--   <div id="dialog" class="hidden"> -->
    <div id="dialog">
    <div id="dialogchild">
    <button class="close-dialog">
      X
    </button>
        <div class="message">foobar</div>
        <div class="message2">foobar</div>

    <input v-model="democursorname" v-on:input="demoCursorNameCheck" placeholder="Display Name" maxlength="30" id="textinput" type="text">

    <div class="radioscontainer">
      <input class="radiobutton" type="radio" id="contactChoice1"
       name="roleRadio" v-on:change="radioChange" v-model="roleRadio" value="current-student">
      <label for="contactChoice1">Current Student</label> <br>

      <input class="radiobutton" type="radio" id="contactChoice2"
       name="roleRadio" v-on:change="radioChange" v-model="roleRadio" value="faculty-staff">
      <label for="contactChoice2">Faculty & Staff</label><br>

      <input class="radiobutton" type="radio" id="contactChoice3"
       name="roleRadio" v-on:change="radioChange" v-model="roleRadio" value="alumnus">
      <label for="contactChoice3">Alumnus</label><br>
      
            <input class="radiobutton" type="radio" id="contactChoice4"
       name="roleRadio" v-on:change="radioChange" v-model="roleRadio" value="friend-cu">
      <label for="contactChoice4">Friend</label>
    </div>

      <div class="yourcursorspan">Your cursor
  </div>
    
<div class="cursordemo">
 <div id="demo-cursor" class="current-student friend demo-cursor"><div id="democursortext" class="current-student name name-demo">{{ democursorname }}</div></div>
  
    </div>

    <div>
      <button class="ok">Enter</button><br>
      <button class="cancel">Skip</button>
    </div>
  </div>
  </div>
      </div>   

</template>

<script>
  import {Player, Friend, Meeting} from './People.class.js'
  import {BadWords} from './BadWords.js'
  import {ref , onBeforeMount } from "vue";
  
    export default {
    name: 'Cursors',
    props: {
      
    },
  setup (props){
    
    return{}
  },
      data() {
    return {
      isConnected: false,
      socketMessage: '',
      democursorname: '',
      roleRadio: ""
    }
  },

  mounted(){
         this.prev = null;
     this.prevprev = null;  
  },

  sockets: {
    connected(data) {
      console.log(this.$socket.client)

                          document.getElementById('connections').innerHTML = (data.connections-1) + " ";
                    if ((data.connections-1)===1){
                      document.getElementById("othervisitors").innerHTML = " other visitor online"
                    } else {
                        document.getElementById("othervisitors").innerHTML = " other visitors online"
                    }
      

      this.isConnected = true;
    },
    
    init(data){

      
   async function run(data, that){
      
  that.BadWords1 = new BadWords();
  function promptPromise(message, message2) {
  var dialog  = document.getElementById('dialog');
  var input   = document.getElementById("textinput");
  var okButton = dialog.querySelector('button.ok');
  var XButton = dialog.querySelector('button.close-dialog');
  let radio = ""
  
  dialog.querySelector('.message').innerHTML = String(message);
  dialog.querySelector('.message2').innerHTML = String(message2)
  dialog.className = '';

  return new Promise(function(resolve, reject) {
    dialog.onclick = function(e){
      if (e.target.tagName !== 'BUTTON') { return; }
      dialog.onclick = null;
      dialog.className = 'hidden';
      if (e.target === okButton) {
var radios = document.getElementsByName('roleRadio');
for (var i = 0, length = radios.length; i < length; i++) {
  if (radios[i].checked) {
   radio = radios[i].value
   console.log(radio)
   console.log("was radio")
    resolve({input: input.value, radio: radio});
    break;
  }
}

      } else if (e.target === XButton){
      } else {
        resolve({input: input.value, radio: "undefined"});
      }
    };
  });
}
    

  var button = document.getElementById('action');
  var output = document.getElementById('prompt');
  var rolefield = document.getElementById('role')
    promptPromise('Welcome to the Cooper Union School of Art End of Year Show 2021!', 'Would you like your cursor to be visible while you move <br> through the galleries?').then(function(name) {
      output.innerHTML = '' + name.input;
      rolefield.innerHTML = "" + name.radio;
      console.log("response completed!")
      console.log(that.$socket.client)
      const response = {name: name.input, role: name.radio}
      that.$socket.client.emit('nameChosen', {response: response, player: data.player})
                            that.Meeting1 = new Meeting(that.$socket)  
                      console.log(data)
      console.log("data")
                      // data.friends.forEach(friend1 => console.log(friend1));
                      data.friends.forEach(friend1 => that.Meeting1.createFriend(friend1.id, data.player, that.Meeting1, friend1.name, friend1.role, friend1));
                      self.player = new Player(data.player);

                      document.querySelector("body").onmousemove = (e) => {
                          console.log(document.querySelector("body"))
                          const x = e.clientX
                          const y = e.clientY
                          const location = player.update(x,y,that.$socket, data.player, name.input, name.radio) 
                      };    
    
    }).catch(function() {
      // output.innerHTML = '¯\\_(ツ)_/¯';
      console.log("ERROR?")
    }); 
   
   }
      console.log(this)
      var that = this;
      run(data, that);
      
    },
    
    nameUpdated(data){
     console.log("name updated", data)
     this.Meeting1.updateFriendName(data.data.id, data.data.player, this.Meeting1, data.data.name, data.data.role, data)
    },

    disconnect() {
      this.isConnected = false;
    },
    
    newFriend(data){
      this.Meeting1.createFriend(data.friend, data.player, this.Meeting1, data.name, data.role);
    },
    byeFriend(data){
                     
                     document.getElementById('connections').innerHTML = (data.connections-1) +" ";
                    if ((data.connections-1)===1){
                      document.getElementById("othervisitors").innerHTML = " other visitor online"
                    } else {
                        document.getElementById("othervisitors").innerHTML = " other visitors online"
                    }
                          this.Meeting1.removeFriend(self,data.friend, this.Meeting1);
    },
    move(data){
      this.Meeting1.updateFriend(data);
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data
    }
  },

  methods: {
    pingServer() {
      // Send the "pingServer" event to the server.
      this.$socket.client.emit('pingServer', 'PING!')
    },
      onMouseMove (ev) {
                          const x = ev.clientX
                          const y = ev.clientY
                          const location = player.update(x,y,this.$socket)
      },
     
    demoCursorNameCheck: function (){
      // console.log(this.democursorname)
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
    
    }
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
    overflow: hidden;
    pointer-events:all;
  }
  
  #cursorscontainercontainer >>> #cursorscontainer {
    height: 100%;
    width: 100vw;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    pointer-events:none;
  }  
  
#cursorscontainer >>> .friend {
    background-color: gainsboro;
    width: 1px;
    height: 1px;
/*   background: url("https://cdn.glitch.com/fc76c743-ed4f-40b8-8cf5-889b2f64b004%2Fcursor.png?v=1621812496190"); */
  position: absolute;
  z-index: 101;
/*   clip-path: polygon(6% 22%, 50% 30%, 94% 22%, 66% 55%, 50% 95%, 34% 56%); */
  pointer-events: none;
    transition: left 0.1s ease-out, top 0.1s ease-out;
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
  z-index: 101;
  clip-path: polygon(6% 22%, 50% 30%, 94% 22%, 66% 55%, 50% 95%, 34% 56%);
  pointer-events: none;
}

#cursorscontainer >>> .friend .name {
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
  z-index: 101;
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
    background: gainsboro;
    border-radius: 10px;
    text-align: center;
    display: block;
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
  
}

#cursorscontainer >>> .message2{
      font-size: 14px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    line-height: 18px;
  padding-top: 10px;
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
