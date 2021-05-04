<template>
  <button @click="counter++">count is: {{ counter }}</button>
  <div id="counter" :style="{backgroundColor:color}">
    Counter: {{ counter }} {{color}}
  </div>  
</template>

<script>
  
  import { ref } from "vue";
 
  export default {
    props: ['color'],
    setup(context, props){
      const counter = ref(0)
      return {counter}
    }
  }

</script>

<style scoped>

/*   div {
    background-color: green;
  } */

</style>