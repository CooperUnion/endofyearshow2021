<template>
  <router-view/>
</template>

<script>
  import { ref, onBeforeMount } from "vue";

  export default {
    name: 'App'
  }
</script>

<style>
	@import url('https://cdn.jsdelivr.net/gh/yegor256/tacit@gh-pages/tacit-css-1.5.5.min.css');
	
	body {
		padding: 0;
		color: black;
	}
	
	body.dark {
		color: white;
		background-color: black;
	}
	
	a {
		color: inherit;
		font-weight: bold;
		text-decoration: underline;
	}
	
	h1, h2, h3, h4, h5, h6 {
		color: inherit;
		line-height: 1.1;
	}
	
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: left;
		margin: 0 auto;
		max-width: 1200px;
	}
	
	main {
		width: calc(100% - 240px);
		margin: 0 auto;
	}
		
	@media screen and (max-width: 767px) {
		main {
			width: calc(100vw - 48px);
		}
	}
	
	@media screen and (min-width: 768px) and (max-width: 1024px) {
		main {
			width: calc(100vw - 72px);
		}
	}
</style>
