<template>
  <div class="hello">
    <h1>
      A test from Erin {{fancy}}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    fancy: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
h1 {
  background-color:gainsboro;
}
</style>
