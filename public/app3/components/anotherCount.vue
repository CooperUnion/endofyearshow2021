<template>
  <button @click="counter++">count is: {{ counter }}</button>
  <div id="counter2">
    Counter: {{ counter }}
  </div>  
</template>

<script>
  
  import { ref } from "vue";
 
  export default {
    setup(){
      const counter = ref(0)
      return { counter }
    }
  }

</script>

<style scoped>

  div {
    background-color: gainsboro;
  }

</style>