<template>
  <div class="post-scrim">
    <div class="scrim-contents">
      <img :src="media.source_url" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PostScrim',
    props: {
      media: Object
    }
  }
</script>

<style scoped>
  .post-scrim {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #000;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .post-scrim .scrim-contents {
    margin: 48px 120px;
  }

  .post-scrim .scrim-contents img {
    max-width: 100%;
    height: auto;
  }

  
</style>
