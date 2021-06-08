<template>
<div v-if="optOutStatus===false && mobile === false" class="cursorsBox">
  <cursor-display :self="true" :player="player" />
  <cursor-display 
    v-for="player in playerCursors" 
    v-bind:key="player.id" 
    :player="player"  />
</div>

<cursors-sign-up />

</template>

<script>
  import { ref, onBeforeMount, onMounted, getCurrentInstance} from 'vue'
  import { useStore } from 'vuex'  
  import CursorDisplay from '@/components/CursorDisplay.vue'
  import CursorsSignUp from '@/components/CursorsSignUp.vue'

  export default {
    name: 'CursorsDisplay',
    components:{
      CursorDisplay,
      CursorsSignUp
    },
    props:{},
    setup(props){

  const htmlElem = document.documentElement;
  function captureScreenWidth() {
    htmlElem.style.setProperty('--innerwidth', `${htmlElem.clientWidth}px`);
    htmlElem.style.setProperty('--scrollbarwidth', `${window.innerWidth - htmlElem.clientWidth}px`);
  }
  window.addEventListener("resize", captureScreenWidth);
  htmlElem.style.height = "200vw";
  captureScreenWidth();
  htmlElem.style.height = "";
  
      const internalInstance = getCurrentInstance()
      const { mobile } = internalInstance.appContext.config.globalProperties
      
      const store = useStore()
      const player = ref({})
      const playerCursors = ref(store.state.socket.playerCursors)
      const loggedIn = ref(false)
      const optOutStatus = ref(false)

      onBeforeMount(()=>{
        try {
          if(localStorage.getItem('optOut') === 'true') {
            optOutStatus.value = true
            loggedIn.value = false
            player.value = {}
          }
        } catch (e) {}
        try {
          if(localStorage.getItem('player')) {
            optOutStatus.value = false
            loggedIn.value = true
            player.value = JSON.parse(localStorage.getItem('player'))
          }
        } catch (e) {}        
      })
      
      onMounted(()=>{
        if(loggedIn.value === true) {
          window.onmousemove = (e) => {
            const x = ((e.clientX / window.innerWidth) * 100).toFixed(2)
            const y = e.pageY
            player.value.position = {x,y}
            store.dispatch('move', player.value)
          }
        }
      })  

      return { 
        player, 
        playerCursors,
        mobile, 
        optOutStatus,
      }
    }
  }
</script>

<style scoped>
  
/*   <div class="showDialog" @click="showDialog"> Δ
</div> */
  .showDialog {
    background-color: red;
    height: 24px;
    width: 24px;
    position: absolute;
    right: 0px;
    top : 60px;
    z-index: 999;
  }  
.cursorsBox {
  margin: 0 -120px;
  max-width: unset;
  width: 98vw;
  position: absolute;
  height: 1px;
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

  }
  
	@media screen and (min-width: 1440px) {
		.cursorsBox {
			margin: 0 calc((100vw - var(--scrollbarwidth)) / -2 + 600px - 120px);
		}
	}
	
	@media screen and (min-width: 768px) and (max-width: 1024px) {
		.cursorsBox {
			margin: 0 -36px;
		}
	}
	
	@media screen and (max-width: 767px) {
		.cursorsBox {
			margin: 0 -24px;
		}
  }
  
</style>