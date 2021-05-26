<template>
  <span class="dotbutton">
    <tag-dot :class="isActive()" :expanded="expanded" :label="tag"></tag-dot>
    <svg class="toggle" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="14" height="14" viewbox="0, 0, 14, 14">
      <path d="M6,8 L6,13.018 C6,13.551 6.449,14 7,14 C7.551,14 8,13.551 8,13 L8,8 L13.018,8 C13.551,8 14,7.551 14,7 C14,6.449 13.551,6 13,6 L8,6 L8,1 C8,0.431 7.551,0 7,0 C6.449,0 6,0.449 6,1 L6,6 L1,6 C0.431,6 0,6.449 0,7 C0,7.551 0.449,8 1,8 L6,8 z" />
    </svg>
  </span>
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
  
  .toggle {
    position: absolute;
    top: 5px;
    left: 5px;
    height: 14px;
    width: 14px;
    fill: inherit;
    display: none;
  }
    
  .nav-list .nav-item .tag.active .toggle {
    transform: rotate(45deg);
  }

  .nav-list .nav-item .tag.inactive .toggle {
    transform: rotate(0deg);
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
  
  .nav-list .nav-item .tag:not([data-tagname="view-all"]).inactive .toggle {
    top: 3px;
    left: 3px;
  }


</style>

