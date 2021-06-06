<template>

      <div id="cursorscontainer" class="online-users">
       <span id="connections">
        </span> <span id="othervisitors"> other visitors online</span><br>
          <p class="online-users">Your name is "<span id="prompt"></span>"</p>
  <p class="online-users">Your role is "<span id="role"></span>"</p>
    </div>


</template>

<script>

  import {ref , onBeforeMount, computed } from "vue";
  import { useStore } from 'vuex';
  
    export default {
    name: 'connections',
    props: {
      
    },
  setup (props){
    
        const store = useStore()
        const message = computed(() => store.state.socket.message)
        const cursors = computed(() => store.state.socket.cursors)
        // const playercursor = computed(() => store.state.socket.playercursor)
        // const init = computed(() => store.state.init)
        // console.log(init)
        // console.log("init component")
    
        const dump = ()=>{
          console.log(store.state.socket)
        }
        
        const update = (message, cursors)=>{
          store.dispatch('client_userMessage', `data from vue client, ${message}`)
        }    
        
        const updatePlayerPos = (message, cursors) =>{
          store.dispatch('client_playerCursorMove', `data from cursor movement, ${cursors}, ${message}`)
        }
        
      return {message, dump, update}

  },
      data() {
    return {
      isConnected: false,
      socketMessage: '',
      cursors: []
    }
  },

  mounted(){     

  },

  methods: {

    
    pingServer() {
      // Send the "pingServer" event to the server.
      this.$socket.client.emit('pingServer', 'PING!')
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
  font: 10px "Lucida Grande", Helvetica, Arial, sans-serif;
  margin: 0px;
}
a {
  color: #00b7ff;
}
  
  #cursorscontainer {
    position: absolute;
    right: 0;
    top: 0;
       -webkit-filter: blur(0px);
/*     overflow: hidden; */
    pointer-events:none;
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



@media only screen and (max-width: 600px) {

  
  }
  
  
  @media only screen and (max-width: 400px) {


  }
</style>
