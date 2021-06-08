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

</style>