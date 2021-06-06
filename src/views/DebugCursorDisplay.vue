<template>
  <h1>
    DebugCursorDisplay
  </h1>
  <cursor-display/>
</template>
<script>

  import { ref, computed, inject, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'  
  import CursorDisplay from '@/components/CursorDisplay.vue'
  
  export default {
    name: 'DebugCursorDisplay',
    components:{
      CursorDisplay
    },
    props:{
      test: String
    }
  }
</script>