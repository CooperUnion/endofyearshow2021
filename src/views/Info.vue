<!--htmlhint attr-lowercase:false --> 
<template>
	<global-header />
	<main>
		<div class="infoPage">
			<h3>
				The Cooper Union <mark>End of Year Show</mark> offers the student body a chance to showcase the projects completed over the year. Works are tagged for multiple areas, reflecting on the interdisciplinarity central to the school’s ethos.
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
			<div class="separator">
				<img src="../assets/separatorgraphic.png" width="1235" height="298" alt="a colorful graphical separator" />
			</div>
			<small> 
				<p>
					The Cooper Union School of Art End of Year Show 2021 was designed in a collaborative effort. 
				</p>
				<dl> 
					<dt>Designers:</dt>
					<dd><a href="/student/ashlynn-guo">Ashlynn Guo</a> A’21</dd>
					<dd><a href="https://ricc.glitch.me/">Richard Yurewitch</a> A’22</dd>
					<dd><a href="/student/ana-valeria-castillos">Ana Valeria Castillos</a> A’22</dd>
				</dl>
				<dl> 
					<dt>Art director:</dt>
					<dd>Julie Harris, Adjunct Instructor </dd>
				</dl>
				<dl> 
					<dt>Developers:</dt>
					<dd><router-link to="/colophon">🚧</router-link><a href="https://erinsparling.glitch.me">-Erin Sparling</a>, Adjunct Professor</dd>
					<dd><a href="https://prevdef.com">Mike Stamm</a></dd>
					<dd><a href="https://ricc.glitch.me/">Richard Yurewitch</a> A’22</dd>
				</dl>
				<dl> 
					<dt>Advisors:</dt>
					<dd>Alexander Tochilovsky, Associate Professor</dd>
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
	<global-footer :items="globalNavItems" />
</template>

<script>
  import { getCurrentInstance, inject } from 'vue'
  import { globalNavItems } from '@/router/index.js'
	import GlobalHeader from '@/components/GlobalHeader.vue' 
	import GlobalFooter from '@/components/GlobalFooter.vue' 

  export default {
  name: 'Info',
  components: {
    GlobalHeader,
    GlobalFooter
  },
  props: {
    theme: Array
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
		padding-bottom: 200px;
	}
	
	mark {
		background-color: transparent;
		color: #DEFF10;
	}
	
	.separator {
		margin-bottom: 1.5em;
	}
	
/* 
	.separator img + img {
		margin-top: -75%;
		mix-blend-mode: screen;
	}
 */
	
	h3 {
		font-size: 48px;
		margin: 0.5em 0 1.5em 0;
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
	}
	
	@media screen and (max-width: 767px) {
		.infoPage {
			width: auto;
			padding-bottom: 56px;
		}
			
		.separator {
			margin-right: -24px;
			
			width: calc(100% + 24px);
			overflow: hidden;
			max-width: unset;
		}

		.separator img {
			width: 175%;
			max-width: unset;
		}

		h3 {
			font-size: 30px;
		}
		
		p {
			font-size: 20px;
		}
		
		small {
			font-size: 14px;
		}
	}
</style>