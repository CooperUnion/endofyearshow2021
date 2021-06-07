<template>
	<div class="headerBlock">
		<div class="tagBlock">
			<student-tag-circles :tags="tags"/>
		</div>
		<div class="titleBlock">
			<h2 class="subHead">{{name}}</h2>
		</div>
	</div>
</template>

<script>
  import { ref, watch } from "vue";
  import { useRoute } from 'vue-router'  
  import StudentTagCircles from '@/components/StudentTagCircles.vue'
  
  export default {
    name: 'StudentSubheader',
    components: {
      StudentTagCircles    
    },
    props: {
      name: String,
      tags: Array
    },
    setup(props){
    	const title = "I'm not smart enough to figure out how to pass data to a component"
            
      return {title}
    }
  }
  
</script>

<style scoped>
	.headerBlock {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 48px 0 144px 0;
	}
	
	.tagBlock {
		margin-right: 12px;
	}
	
	.subHead {
		font-size: 48px;
		text-align: left;
		text-transform: capitalize;
		font-weight: 500;
		margin: 0;
	}
	
	.listBlock {
		width: 39%;
		text-align: left;
	}
	
	.subList {
		list-style-type: none;
		text-align: left;
		font-size: 18px;
		font-weight: 500;
		line-height: 24px;
		margin: 0;
	}
	
	@media screen and (max-width: 767px) {
		.subHead {
			font-size: 32px;
		}
	}
</style>

