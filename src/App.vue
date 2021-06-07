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
	@import url('https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,300;0,500;1,300;1,500&display=swap');
	
	body {
		padding: 0;
		color: black;
	}
	
	body.dark {
		color: white;
		background-color: black;
		background-image: url(./assets/infodots-head.png);
		background-repeat: no-repeat;
		background-position: center top;
		background-size: 33% auto;
	}
	
	a {
		color: inherit;
		font-weight: bold;
		text-decoration: underline;
	}
	
	h1, h2, h3, h4, h5, h6 {
		color: inherit;
		line-height: 1.25;
	}
	
	#app {
		font-family: Epilogue, Avenir, Helvetica, Arial, sans-serif;
		font-weight: 300;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: left;
		margin: 0 auto;
		max-width: 1200px;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	
	main {
		width: calc(100% - 240px);
		margin: 0 auto;
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	
	@media screen and (max-width: 767px) {
		body.dark {
			background-image: none;
		}
		
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
