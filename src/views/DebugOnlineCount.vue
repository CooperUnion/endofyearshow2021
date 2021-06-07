<template>
  <h1>
    DebugOnlineCount
  </h1>
  <b @click="dump()">dump vuex</b>

  <online-count />
  Current live data: {{position}} <br />
  Data from vuex: {{storeRetreivedData.connections}}
</template>
<script>

  import { ref, computed, inject, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'  
  import OnlineCount from '@/components/OnlineCount.vue'
  
  export default {
    name: 'DebugOnlineCount',
    components:{
      OnlineCount
    },
    props:{
      test: String
    },
    setup(props){

      const store = useStore()

      const position = ref({})


      const storeRetreivedData = ref(store.state.socket)


      const dump = ()=>{
        console.log(store.state.socket)
      }

      return { position, dump, storeRetreivedData }
    }
  }
</script>