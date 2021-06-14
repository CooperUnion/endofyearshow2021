<template>
  <div class="projectsBox">
    <div class="item" v-for="item in items" v-bind:key="item.id">
      <!-- block item markup -->
        <div class="post" v-if="item.id">
					 <post-media @click.prevent="loadScrim(item.id)" 
							:media="item.assets.preview" />
 					<section class="meta">
						<post-info
							:tags="item.taxonomy.tags"
							:title="item.title"
							:post="item.id" />
						<div class="description-block">
							<p v-if="item.meta.materials" class="materials" v-html="item.meta.materials"></p>      
							<p v-if="item.meta.description" class="description" v-html="item.meta.description"></p>
							<p v-if="item.meta.dimensions" class="dimensions" v-html="item.meta.dimensions"></p>
						</div>
						<div class="labels-block"><tag-list :tags="tags" :expanded="true"/></div>
					</section>
          <post-scrim v-if="displayScrim(item.id)"
            :tags="item.taxonomy.tags"
            :title="item.title"
            :author="item.author"
            :assets="item.assets"
            :meta="item.meta"
            :post="item.id"
            :type="item.type"/>
        </div>        
    </div>
  </div>
</template>

<script>
  import { computed, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'  
  import { useStore } from 'vuex'  
    
  import PostInfo from '@/components/PostInfo.vue'
  import PostMedia from '@/components/PostMedia.vue'
  import PostScrim from '@/components/PostScrim.vue'
  
  export default {
    name: 'Projects',
    props: {
      items: Array
    },
    components: {
      PostMedia,
      PostScrim,
      PostInfo
    },
    setup(props){
      const store = useStore()
      const route = useRoute()
      
//       const descText = props.items[0].meta.description.replace(/\n/g, '<br />')
      
      const loadScrim = (id) => {
        store.commit('setActiveScrimId', id)
      }
      
      const hideScrim = () => {
        store.commit('resetActiveScrimId')
      }
      
      const displayScrim = (id) => {
        return id === store.state.application.activeScrimId
      }
      
      return {loadScrim, displayScrim, hideScrim}
    }
  }
</script>

<style scoped>
	.projectsBox {
		margin: 0 auto;
	}
	
	.projectsBox .post {
		margin-bottom: 36px;
	}
	
	.projectsBox .post >>> img {
		display: block;
		width: auto;
		height: auto;
		max-height: 600px;
	}
	
	.meta {
		width: 50%;
	}
	
	.meta >>> .post-info {
		align-items: baseline;
		margin-top: 24px;
	}
		
	.meta >>> .post-info .title {
		font-size: 32px;
	}
	
	.meta .description-block .description {
		white-space: break-spaces;
	}
	
	@media screen and (max-width: 767px) {
		.meta {
			width: auto;
		}
		
		.meta >>> .post-info .title,
						.meta .description-block {
			font-size: 14px;
		}
		
		.meta .description-block p {
			margin-bottom: 0.5em;
		}
	}
</style>
