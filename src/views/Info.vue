<!--htmlhint attr-lowercase:false --> 
<template>
	<global-nav :items="globalNavItems" />
	<main>
		<page-header /> 
		<div class="infoPage">
			<h3>
				The Cooper Union End of the Year Show offers the student body a chance to showcase the projects completed over the year. Works are tagged for multiple areas, reflecting on the interdisciplinarity central to the school’s ethos.
			</h3>
			<p>
				The site navigates through the variety of work in through: 
			</p>
			<p>
				<a href="/projects">Projects</a>: Senior projects and fellowships that develop over the academic year 
			</p>
			<p>
			  <a href="/areas">Areas</a> of study: i.e. painting, sculpture, photography, performance, graphic design, and more 
			</p>
			<p>
				<a href="/forum">Forum</a>: an open space where chance and flux bring forward new conversations and encounters between works 
			</p>
			<p>
			  <a href="/foundation">Foundation</a>: works produced in a series of introductory courses taken by freshman year art students 
			</p>
			<img class="imgsep" alt="Graphical separator" src="../assets/lensgraphic.svg" />
			<small> 
				<p>
					The Cooper Union School of Art End of Year Show 2021 was designed in a collaborative effort. 
				</p>
				<dl> 
					<dt>Designers:</dt>
					<dd><a href="#">Ashlynn Guo</a> A’21</dd>
					<dd><a href="#">Richard Yurewitch</a> A’22</dd>
					<dd><a href="#">Ana Valeria Castillos</a> A’22</dd>
				</dl>
				<dl> 
					<dt>Art director:</dt>
					<dd><a href="#">Julie Harris</a>, Adjunct Instructor   </dd>
				</dl>
				<dl> 
					<dt>Developers:</dt>
					<dd>Erin Sparling, Adjunct Professor</dd>
					<dd>Mike Stamm</dd>
					<dd><a href="#">Richard Yurewitch</a> A’22</dd>
				</dl>
				<dl> 
					<dt>Advisors:</dt>
					<dd>Alexander Tochilovsky, Associate Professor </dd>
					<dd>Beverly Joel, Adjunct Professor</dd>
					<dd>Mike Essl, Dean of the School of Art</dd>
					<dd>EOYS Faculty Advisory Committee</dd>
				</dl>
				<p>
					The School of Art is grateful for the generous support of the Alex Katz Foundation who made this year's End of Year Show possible. 
				</p>
			</small> 		
		</div>
	</main>
</template>

<script>
  import { getCurrentInstance, inject } from 'vue'
  import GlobalNav from '@/components/GlobalNav.vue'
  import { globalNavItems } from '@/router/index.js'
  import PageHeader from '@/components/PageHeader.vue'

  export default {
  name: 'Info',
  components: {
    GlobalNav,
    PageHeader
  },
  props: {
    theme: String
  },
  setup(props){
    const internalInstance = getCurrentInstance()

    // const { api_endpoint, mobile } = internalInstance.appContext.config.globalProperties
    return { globalNavItems }
  }
}
</script>

<style scoped>

	.infoPage {
		width: 50vw;
		margin: 0 auto;
		padding-bottom: 417px;
	}
	
	.imgsep {
		margin-bottom: 1.5em;
	}
	
	h3 {
		font-size: 48px;
		margin-bottom: 1.5em;
	}
	
	p {
		font-size: 24px;
		margin-bottom: 1.5em;
	}
	
	small {
		font-size: 16px;
		line-height: 1.333;
	}
	
	small p {
		font-size: 16px;
	}
	
	dl {
		display: block;
		margin-bottom: 1.5em;
	}
	
	dt, dd {
		padding: 0;
	}</style>