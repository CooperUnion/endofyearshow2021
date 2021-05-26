<template>
    <tag-dot :class="isActive()" :expanded="expanded" :label="tag" :toggle="true"></tag-dot>
</template>

<script>
  import TagDot from '@/components/TagDot.vue'

  export default {
    name: 'TagButton',
    components: {
      TagDot
    },
    props:{
      expanded: Boolean,
      active: Boolean,
      toggle: Boolean,
      tag: String
    },
    setup(props){
      const isActive = () => {
        return props.active ? 'active' : 'inactive'
      }
      return {isActive}
    }
  }
  
</script>

<style scoped>
  
  .tag {
    cursor: pointer;
  }
  

  .nav-list .nav-item .tag {
    height: 24px;
    width: 24px;
    margin-right: 12px;
  }

  .nav-list .nav-item:hover .tag .toggle {
    display: block; 
  }  

  .nav-list .nav-item .tag:not([data-tagname="view-all"]).inactive {
    background-image: none;
    background-color: #fff;
    border: 2px solid #000;
    fill: #000;
  }
  
</style>

