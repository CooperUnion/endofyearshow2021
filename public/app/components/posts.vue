<template>
  <ul>
    <li class="post" v-for="post in posts">

      <post :post="post"></post>

    </li>  
  </ul>
</template>

<script>
  
  const Post = httpVueLoader('/app/components/post.vue')
  module.exports = {
    components:{
      Post
    },
    props:['posts']
  }
  
</script>

<style scoped>
  .post{
    display:flex;
  }
</style>