<template>
  <div id="counter">
    Counter: {{ counter }}
  </div>  
</template>

<script>
  import { ref } from "vue";
//     export default {
//       setup() {
//         const name = ref('Name etc');
//         const count = ref(0)
//         return { name, count };
//       }
//     };
//   
  
  export default {
    setup(){
      const counter = ref(0)
    }
  }

</script>