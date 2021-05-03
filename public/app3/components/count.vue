<template>
  <button @click="counter++">count is: {{ counter }}</button>
  <div id="counter">
    Counter: {{ counter }}
  </div>  
</template>

<script>
  
  import { ref } from "vue";
 
  export default {
    props: {
      color: 'red'
    },
    setup(){
      const counter = ref(0)
      return {counter}
    }
  }

</script>

<style scoped>

  div {
    background-color: green;
  }

</style>