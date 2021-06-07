import { createStore } from 'vuex'
import {Player, Friend, Meeting} from './People.class.js'

const activeArea = new Set()
const activeGlobalNav = ''
const activeScrimId = 0
const areaCount = new Map()

const playerCursor = {
  id: 0,
  role: '',
  position: {x:0, y:0},
  name: ''
}

const socket = {
  state() {
    return {
      message: {message: undefined, origin: undefined},
      playerCursor,
      playerCursors: [],
      system_message: {message: undefined, origin: undefined},
      connections: 0
    }
  },
  mutations: {
    SOCKET_INIT_START(state, data){
      console.log("socket init start", data)
      const justUsers = data.friends.filter((item)=>{ return typeof item === 'object' })
      justUsers.forEach(user => state.cursors.cursors[user.id] = user)
      //also render them in the page?
      this.Meeting1 = new Meeting()
      console.log(data.player)
      window.sessionStorage.setItem('EOYS2021TempId', data.player)
      // justUsers.forEach(friend1 => this.Meeting1.createFriend(friend1.id, data.player, this.Meeting1, friend1.name, friend1.role, friend1));
    },
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
      state.playercursor = {}
      console.log("statesystemmessagemutationMUTATION", message)
    },
    
    CLIENT_PLAYER_CURSOR_MOVE(state, data) {
    state.playerCursor = data
    // console.log("clientplayercursormove", data)
},
    SOCKET_OTHERUSER_CURSOR_MOVE(state, data){
       // {friend: 21, friendX: "81.41", friendY: "0.21", name: "rry-vue-data-store", role: "current-student"}
      state.playerCursors[data.id] = data
      // console.log(state.cursors[data.friend])
    },
    
    SOCKET_CONNECTED_MESSAGE(state, message) {
      state.connections = message
      console.log("socket connected message ^")
      // console.log("socketconnectedmessage", message)
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
    
    connected({ dispatch, commit }, message) { //new connection for everyone //essentially just there to update "online" count
      console.log("socket connected2!", message)
      commit("SOCKET_CONNECTED_MESSAGE", message)
      // document.getElementById("connections").innerHTML = message.connecitons-1
    },
    nameChosen({ dispatch, commit }, message) {
      console.log("nameChosen!", message) //emit name chosen!
      commit("nameChosen", message)
    },
    
    byeFriend({ dispatch, commit }, message) { //to remove connections, and remove the cursor from the page (does it work properly?)
      //classes: this.connections?
      console.log("byeFriend", message)
                    //        console.log("connections,", message.connections-1)
                    //  document.getElementById('connections').innerHTML = (message.connections-1) +" ";
                    // if ((message.connections-1)===1){
                    //   document.getElementById("othervisitors").innerHTML = " other visitor online"
                    // } else {
                    //     document.getElementById("othervisitors").innerHTML = " other visitors online"
                    // }
                          if(this.Meeting1){
                          this.Meeting1.removeFriend(self,message.friend, this.Meeting1);
                          }
    },
    
    nameUpdated({ dispatch, commit }, message){ //other person's name is uodated, update cursor currently in the page
      console.log("nameUpdated", message)
      
                  if (this.Meeting1){
      this.Meeting1.updateFriendName(message.data.id, message.data.player, this.Meeting1, message.data.name, message.data.role, message)
      } else {
        // console.log(self.player)
        // console.log(data.player)
        if (window.sessionStorage.getItem('EOYS2021TempId')){
        const playerId = window.sessionStorage.getItem('EOYS2021TempId')
        self.player = new Player(playerId);
        this.Meeting1 = new Meeting()
        this.Meeting1.updateFriendName(message.data.id, message.data.player, this.Meeting1, message.data.name, message.data.role, message)
                              window.onmousemove = (e) => {
                          // console.log(document.querySelector("body"))
                          const x = e.clientX
                          const y = e.pageY
                          const location = self.player.update(x,y,dispatch, playerId, window.sessionStorage.getItem('EOYS2021Name'),  window.sessionStorage.getItem('EOYS2021Role')) 
                      }; 
        }
      }
      
    },
    newFriend({ dispatch, commit }, message){ //new cursor first connects, no name, just id
      console.log("newFriend", message)
      
            if (this.Meeting1){
      this.Meeting1.createFriend(message.friend, message.player, this.Meeting1, message.name, message.role); //undefined on purpose
      } else {
        // console.log(self.player)
        // console.log(data.player)
        if (window.sessionStorage.getItem('EOYS2021TempId')){
        const playerId = window.sessionStorage.getItem('EOYS2021TempId')
        self.player = new Player(playerId);
        this.Meeting1 = new Meeting()
        this.Meeting1.createFriend(message.friend, message.player, this.Meeting1, message.name, message.role);
                              window.onmousemove = (e) => {
                          // console.log(document.querySelector("body"))
                          const x = e.clientX
                          const y = e.pageY
                          const location = self.player.update(x,y,dispatch, playerId, window.sessionStorage.getItem('EOYS2021Name'),  window.sessionStorage.getItem('EOYS2021Role')) 
                      }; 
        }
      }
      
    },
    init({ dispatch, commit }, data){ //fires when first chosen, but not on new pageloads? how can we make it first on new pageloads?
      
      console.log("otherusermove", data)
      commit('SOCKET_INIT_START', data)
      
//       console.log("init", data)
//    async function run(data, that, dispatch){
      
//   function promptPromise(message, message2) {
//   let dialog  = document.getElementById('dialog');
//   let input   = document.getElementById("textinput");
//   let okButton = dialog.querySelector('button.ok');
//   let XButton = dialog.querySelector('button.close-dialog');
//   const skipButton = dialog.querySelector('button.cancel')
//   let radio = ""
  
//   dialog.querySelector('.message').innerHTML = String(message);
//   dialog.querySelector('.message2').innerHTML = String(message2)
//   dialog.className = '';

//   return new Promise(function(resolve, reject) {
//     dialog.onclick = function(e){
//       if (e.target.tagName !== 'BUTTON') { return; }
//       dialog.onclick = null;
//       dialog.className = 'hidden';
//       if (e.target === okButton) {
// let radios = document.getElementsByName('roleRadio');
// for (let i = 0, length = radios.length; i < length; i++) {
//   if (radios[i].checked) {
//    radio = radios[i].value
//    console.log(radio)
//     resolve({input: input.value, radio: radio});
//     break;
//   }
// }

//       } else if (e.target === XButton){
//       } else if (e.target === skipButton){
//         resolve({input: "", radio: "skipped"});
//       }
//     };
//   });
// }
    

//   let button = document.getElementById('action');
//   let output = document.getElementById('prompt');
//   let rolefield = document.getElementById('role')
  
//   if (window.sessionStorage.getItem('EOYS2021Name') && window.sessionStorage.getItem('EOYS2021Name') != ""){
//     let dialog  = document.getElementById('dialog');
//     if (dialog){
//     dialog.className = 'hidden'
//     }
//     console.log("session storage SUCCESS")
//     // Save data to sessionStorage

    
//           const response = {name: window.sessionStorage.getItem('EOYS2021Name'), role: window.sessionStorage.getItem('EOYS2021Role')}
//       // that.$socket.client.emit('nameChosen', {response: response, player: data.player})
//           window.sessionStorage.setItem('EOYS2021TempId', data.player)
//           dispatch('nameChosen',{response: response, player: data.player});
//       // console.log("IMPORTANT: emit nameChosen HERE", {response: response, player: data.player})
    
//                       that.Meeting1 = new Meeting()  
//                       console.log(data)
//                       console.log("data")
//                       // data.friends.forEach(friend1 => console.log(friend1));
//                       data.friends.forEach(friend1 => that.Meeting1.createFriend(friend1.id, data.player, that.Meeting1, friend1.name, friend1.role, friend1));
//                       self.player = new Player(data.player);

//                       window.onmousemove = (e) => {
//                           // console.log(document.querySelector("body"))
//                           const x = e.clientX
//                           const y = e.pageY
//                           const location = self.player.update(x,y,dispatch, data.player, response.name, response.role) 
//                       };    
//       output.innerHTML = '' + response.name;
//       rolefield.innerHTML = "" + response.role;

// // Get saved data from sessionStorage
// // let data = sessionStorage.getItem('key');
    
//   }else{
//     var dialog  = document.getElementById('dialog');
//     dialog.classList.remove("hidden")
//     console.log("session storage FAILED")
//     promptPromise('Welcome to the Cooper Union School of Art End of Year Show 2021!', 'Would you like your cursor to be visible while you move <br> through the galleries?').then(function(name) {
//       output.innerHTML = '' + name.input;
//       rolefield.innerHTML = "" + name.radio;
//       console.log("response completed!")
//       // console.log(that.$socket.client)
//       const response = {name: name.input, role: name.radio}
//       window.sessionStorage.setItem('EOYS2021Name', name.input)
//       window.sessionStorage.setItem('EOYS2021Role', name.radio)
//       // that.$socket.client.emit('nameChosen', {response: response, player: data.player})
//       // console.log("IMPORTANT: emit nameChosen HERE", {response: response, player: data.player})
//       dispatch('nameChosen',{response: response, player: data.player});
//                       that.Meeting1 = new Meeting()  
//                       console.log(data)
//       console.log("data")
//                       // data.friends.forEach(friend1 => console.log(friend1));
//                       data.friends.forEach(friend1 => that.Meeting1.createFriend(friend1.id, data.player, that.Meeting1, friend1.name, friend1.role, friend1));
//                       self.player = new Player(data.player);

//                       window.onmousemove = (e) => {
//                           // console.log(document.querySelector("body"))
//                           const x = e.clientX
//                           const y = e.pageY
//                           const location = self.player.update(x,y,dispatch, data.player, name.input, name.radio) 
//                       };    
//       window.sessionStorage.setItem('EOYS2021TempId', data.player)

//     }).catch(function() {
//       // output.innerHTML = '¯\\_(ツ)_/¯';
//       console.log("ERROR?")
//     }); 
//      
//      
//      
  // }
  //  }
  //     let that = this;
  //     run(data, that, dispatch);
      
    },
    socketMove({ dispatch, commit }, data){
      console.log("otherusermove", data)
      commit('SOCKET_OTHERUSER_CURSOR_MOVE', data)    
    },
    move({ dispatch, commit }, data){
      // console.log("playermove", data)
      commit('CLIENT_PLAYER_CURSOR_MOVE', data)
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

const application = {
  state() {
    return {
      activeArea,
      activeGlobalNav,
      activeScrimId,
      areaCount
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
    },
    setAreaCount(state, area, count) {
      areaCount.set(area, count)
    }
  }
}

export default createStore({
  modules:{
    application,
    socket
  }
})



