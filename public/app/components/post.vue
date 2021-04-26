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
  .tile {
    border: 1px solid black;
    width: var(--cell-side);
    height: var(--cell-side);
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>