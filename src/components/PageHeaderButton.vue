<template>
    <a class="refreshButton" href="/areas/random">
      Refresh
    </a>
</template>

<script>
  // import { ref, onBeforeMount } from "vue";

  export default {
    name: 'PageHeaderButton',
    props: {
    },
    setup(props){
      return {}
    }
  }
  
</script>

<style scoped>
	.refreshButton {
		display: block;
		font-weight: 500;
		line-height: 1;
		text-decoration: none;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.refreshButton:hover {
		text-decoration: underline;
	}
	
	.refreshButton:before {
		content: "";
		color: #fff;
		background-color: #000;
		border-radius: 50%;
		width: 36px;
		height: 36px;
		margin: 0 0.5em 0 0;
		display: inline-block;
		background-image: url('../assets/refresh.svg');
		background-size: 24px auto;
		background-repeat: no-repeat;
		background-position: center center;
	}
	
</style>

