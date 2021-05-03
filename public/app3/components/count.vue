<template>
  <button @click="counter++">count is: {{ counter }}</button>
  <div id="counter" :style="bg">
    Counter: {{ counter }} {{color}}
  </div>  
</template>

<script>
  
  import { ref } from "vue";
 
  export default {
    props: ['color'],
    setup(){
      const counter = ref(0)
      const bg = ref(`background-color: ${this.color}`)
      return {counter, bg}
    }
  }

</script>

<style scoped>

  div {
    background-color: green;
  }

</style>