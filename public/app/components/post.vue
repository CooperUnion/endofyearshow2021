<template>
  <div class="post">
    <a :href="post.assets.preview.source_url">
      <img :src="post.assets.preview.thumbnail.source_url" />
    </a>
    <pre>
      id: <a :href="post.route">{{post.id}}</a>
      title: {{post.title}}
      type: {{post.type}}
      author: {{post.author.formatted}}
      tags: {{post.taxonomy.tags}}
      description: {{post.meta.description}}
      url: <a :href="post.assets.url">{{post.assets.url}}</a>
      high-res: <a :href="post.assets.preview.source_url">{{post.assets.preview.source_url}}</a>
      <span v-if="post.type === 'video'">video: <a :href="post.assets.media.url">{{post.assets.media.url}}</a></span>
    </pre>
  </div>
</template>

<script>
  
  module.exports = {
    props:['post']
  }
  
</script>

<style scoped>
  .post{
    display:flex;
  }
  
  pre, pre *, p {
    font-family: "courier new"
  }
  
  pre a, p a {
    text-decoration:underline;
  }
</style>