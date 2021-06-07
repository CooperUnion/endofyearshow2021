<template>
	<div class="headerBlock">
		<div class="titleBlock">
			<student-tag-circles />  <!-- :tags="student.tags" -->
			<h2 class="subHead">{{project.name}}</h2>
		</div>
		<div class="listBlock">
			<ul v-if="items" class="subList">
				<li v-for="item of items" v-bind:key="item">
					<router-link :to="item.url">{{item.name}}</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
  import { ref, watch } from "vue";
  import { useRoute } from 'vue-router'  
  import StudentTagCircles from '@/components/StudentTagCircles.vue'
  
  export default {
    name: 'PageSubheader',
    components: {
      StudentTagCircles    
    },
    props: {
      items: Array,
			project: Object
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
		margin: 48px 0 144px 0;
	}
	
	.titleBlock {
		width: 61%;
		padding-right: 10%;
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

