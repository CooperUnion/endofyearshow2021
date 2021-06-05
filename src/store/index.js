import { createStore } from 'vuex'
  import {Player, Friend, Meeting} from './People.class.js'

const activeArea = new Set()
const activeGlobalNav = ''
const activeScrimId = 0


const socket = { 
  state() {
    return {
      message: {message: undefined, origin: undefined},
      playercursor: {message: undefined, origin: undefined},
      cursors: {cursors: undefined, origin: undefined},
      system_message: {message: undefined, origin: undefined}
    }
  },
  mutations: {
    SOCKET_USER_MESSAGE(state, message) {
      state.message = {message, origin: 'socket'}
      console.log("socketusermessagemutationMUTATION", message)
    },
    CLIENT_USER_MESSAGE(state, message) {
      state.message = {message, origin: 'client'}
      console.log("clientusermessagemutationMUTATION", message)
    },
    SOCKET_SYSTEM_MESSAGE(state, message) {
      state.system_message = {message, origin: 'system'}
      console.log("statesystemmessagemutationMUTATION", message)
    },
    
    CLIENT_PLAYER_CURSOR_MOVE(state, message) {
    state.message = {message, origin: 'client'}
    console.log("clientplayercursormove", message)
},
    SOCKET_CONNECTED_MESSAGE(state, message) {
      state.message = {message, origin: 'socket'}
      console.log("socketconnectedmessage", message)
    },
    SOCKET_INIT(data, state){
      // state.init = data
      // console.log("initdata", data)
    },
    // move(state, message){
    //   console.log("playermove", message)
    //   state.playercursor = {message, origin: 'client'}
    //   //how to send to socket???
    //       // commit("CLIENT_PLAYER_CURSOR_MOVE", message)
    // },
    
  },
  actions: {
    socket_userMessage ({ dispatch, commit }, message) {
     commit('SOCKET_USER_MESSAGE', message);
      console.log("socketusermessageACTION", message)
    },
    client_userMessage({ dispatch, commit }, message) {
      commit('CLIENT_USER_MESSAGE', message)
      console.log("clientusermessageACTION", message)
    },
    socket_systemMessage({ dispatch, commit }, message) {
      commit('SOCKET_SYSTEM_MESSAGE', message);
      console.log("socketsystemmessageACTION", message)
    },
    
    client_playerCursorMove({ dispatch, commit }, message) {
    commit('CLIENT_PLAYER_CURSOR_MOVE', message);
    console.log("client player cursor move", message)
  
},
    
    connected({ dispatch, commit }, message) {
      console.log("socket connected2!", message)
      commit("SOCKET_CONNECTED_MESSAGE", message)
    },
    
    byeFriend({ dispatch, commit }, message) {
      console.log("byeFriend", message)
    },
    
    nameUpdated({ dispatch, commit }, message){
      console.log("nameUpdated", message)
    },
    newFriend({ dispatch, commit }, message){
      console.log("newFriend", message)
    },
    init({ dispatch, commit }, data){
      console.log("init", data)
        console.log("init")   
      commit("SOCKET_INIT", data)
   async function run(data, that, dispatch){
      
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
  
  if (window.sessionStorage.getItem('EOYS2021Name')){
    var dialog  = document.getElementById('dialog');
    dialog.className = 'hidden'
    console.log("session storage SUCCESS")
    // Save data to sessionStorage

    
          const response = {name: window.sessionStorage.getItem('EOYS2021Name'), role: window.sessionStorage.getItem('EOYS2021Role')}
      // that.$socket.client.emit('nameChosen', {response: response, player: data.player})
      console.log("IMPORTANT: emit nameChosen HERE", {response: response, player: data.player})
    
                      that.Meeting1 = new Meeting(that.$socket)  
                      console.log(data)
                      console.log("data")
                      // data.friends.forEach(friend1 => console.log(friend1));
                      data.friends.forEach(friend1 => that.Meeting1.createFriend(friend1.id, data.player, that.Meeting1, friend1.name, friend1.role, friend1));
                      self.player = new Player(data.player);

                      document.querySelector("body").onmousemove = (e) => {
                          // console.log(document.querySelector("body"))
                          const x = e.clientX
                          const y = e.clientY
                          const location = self.player.update(x,y,dispatch, data.player, response.name, response.role) 
                      };    
      output.innerHTML = '' + response.name;
      rolefield.innerHTML = "" + response.role;

// Get saved data from sessionStorage
// let data = sessionStorage.getItem('key');
    
  }else{
    var dialog  = document.getElementById('dialog');
    dialog.classList.remove("hidden")
    console.log("session storage FAILED")
    promptPromise('Welcome to the Cooper Union School of Art End of Year Show 2021!', 'Would you like your cursor to be visible while you move <br> through the galleries?').then(function(name) {
      output.innerHTML = '' + name.input;
      rolefield.innerHTML = "" + name.radio;
      console.log("response completed!")
      // console.log(that.$socket.client)
      const response = {name: name.input, role: name.radio}
      window.sessionStorage.setItem('EOYS2021Name', name.input)
      window.sessionStorage.setItem('EOYS2021Role', name.radio)
      // that.$socket.client.emit('nameChosen', {response: response, player: data.player})
      console.log("IMPORTANT: emit nameChosen HERE", {response: response, player: data.player})
                            that.Meeting1 = new Meeting(that.$socket)  
                      console.log(data)
      console.log("data")
                      // data.friends.forEach(friend1 => console.log(friend1));
                      data.friends.forEach(friend1 => that.Meeting1.createFriend(friend1.id, data.player, that.Meeting1, friend1.name, friend1.role, friend1));
                      self.player = new Player(data.player);

                      document.querySelector("body").onmousemove = (e) => {
                          // console.log(document.querySelector("body"))
                          const x = e.clientX
                          const y = e.clientY
                          const location = self.player.update(x,y,dispatch, data.player, name.input, name.radio) 
                      };    

    }).catch(function() {
      // output.innerHTML = '¯\\_(ツ)_/¯';
      console.log("ERROR?")
    }); 
     
     
     
  }
   }
      console.log(this)
      var that = this;
      run(data, that, dispatch);
      
    },
    socketMove({ dispatch, commit }, message){
      console.log("move", message)
    },
    move({ dispatch, commit }, message){
      console.log("playermove", message)
      
    }
    
    
    //PLAYERMOVE emit move
    
    // socket on connection (socket connections number)
    // socket init 
    // socket client cursor move
    // socket otherclient cursor move 
    // socket disconnect (byefriend)
    // socket nameupdate 
    // socket newfriend
  }
}

export default createStore({
  state() {
    return {
      activeArea,
      activeGlobalNav,
      activeScrimId
    }
  },
  mutations: {
    activateArea(state, areaItem) {
      state.activeArea.add(areaItem)
    },
    deactivateArea(state, areaItem) {
      state.activeArea.delete(areaItem)
    },
    resetAreas(state) {
      state.activeArea = new Set()
    },
    setGlobalNav(state, globalNavItem) {
      state.activeGlobalNav = globalNavItem
    },
    setActiveScrimId(state, id) {
      state.activeScrimId = id
    },
    resetActiveScrimId(state) {
      state.activeScrimId = 0
    }
    
  },
  // getters: {
  //   currentAreaState: (state) => {
  //     return (navItem) => {
  //       return state.activeArea.has(navItem)
  //     }
  //   }
  // },
  actions: {
  },
  modules: {
    socket
  }
})



