<template>
  <div class="loading" :class="this.loading === false ? 'done' : ''">
    <small class="progress">loading...</small>
    <small class="final" >No work of this type available.</small>
  </div>
</template>

<script>
  
  module.exports = {
    data() {
      return {
        loading: true
      }
    }, 
    methods: {
      async init(){
        setTimeout(()=>{
          this.loading = false
        }, 10000)
      }
    },
    mounted: async function () {
      this.init()
    }
  }
  
  export default {
    components: {
      PostInfo,
      PostMedia
    },
    props: {
      post: String
    },
    setup(props){
      const loading = ref(true)
      const items = ref([])
            
      onBeforeMount(loadPosts)
      async function loadToggle(){
        console.log("ok...")
        loading.value = loading.value === true ? false : true
      }
      
      async function loadPosts(){
        items.value = await fetch(`https://eoys-uploader-2021.glitch.me/api/posts`).then(res=>res.json())
        loading.value = false
        console.log(items.value)
        return true
      }
      return {items, loading, loadToggle, loadPosts}
    }
  }
  
</script>

<style scoped>
  
  .loading {
    background-image: url(https://cdn.glitch.com/1ddf0756-3e11-469e-97f4-3ee8ac80c2ed%2Floading.gif?v=1595735806939);
    background-size: contain;
    width: 100px;
    height: 100px;
  }

  .loading>small {
    display:none;
  }

  .loading.done {
    background:none;
    width: auto;
  }

  .loading.done>small.final {
    display: block;
    padding: 5px;
  }
  
</style>

