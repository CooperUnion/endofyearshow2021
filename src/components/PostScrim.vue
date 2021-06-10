<template>
  <div class="post-scrim">
    <div class="scrim-shroud"></div>
    <div class="scrim-contents">
      <header class="title-block">
        <h6 class="credits"><span class="title" v-html="title"/>
					<a class="author" @click="hideScrim()" :href="'/student/'+author.slug" v-html="author.formatted" />
				</h6>
        <button class="close" @click="hideScrim()">close</button>
        <template v-if="assets.media.length>1">
          <span class="paginator">{{current + 1}}/{{assets.media.length}}</span>
        </template>    
      </header>
      <div v-if="type==='images' && isPdf() === false" :class="['imageDeck', {'animating' : animState}, animDirection]">
				<div :class="['dragSleeve', {overshoot : isOvershooting}]" ref="dragSleeve">
					<div :class="['carousel', assets.media.length>1 ? 'multiple' : '']" >
						<div class="realBox current"><img :src="assets.media[current].source_url" class="imgPrime" /></div>
						<template v-if="assets.media.length>1">
							<div class="ghostBox prev"><img :src="assets.media[getPrev()].source_url" class="ghostImg" /></div>
							<div class="ghostBox next"><img :src="assets.media[getNext()].source_url" class="ghostImg" /></div>
						</template>
					</div>
        </div>
        <template v-if="assets.media.length>1">
					<template v-if="mobile">
						<ul class="paginationDots">
							<li v-for="(media, index) of assets.media" v-bind:key="media.id" :class="['dot', index === current ? 'selected' : '']"></li>
						</ul>
					</template>   
					<template v-else>
						<button class="imgControl prev" @click="goPrev()">previous</button>
						<button class="imgControl next" @click="goNext()">next</button>
					</template>    
        </template> 
      </div>

      <div v-if="type==='images' && isPdf() === true" :class="['imageDeck', {'animating' : animState}, animDirection]">
				<img :src="assets.preview.source_url" />
        <p class="outgoingLink"><a :href="assets.media[0].source_url" target="_blank">View full pdf</a></p>
      </div>

     <div v-if="type==='text'" class="urlDeck">
        <img :src="assets.preview.source_url" />
        <p v-if="assets.url" class="outgoingLink"><a :href="outgoingSiteURL" target="_blank">View work on {{outgoingSiteType}}</a></p>
      </div>

      <div v-else-if="type==='audio'" class="audioDeck">
        <img :src="assets.preview.source_url" />
        <p v-if="assets.url" class="outgoingLink"><a :href="outgoingSiteURL" target="_blank">Hear work on {{outgoingSiteType}}</a></p>
      </div>
      
      <div v-else-if="type==='url'" class="urlDeck">
        <img :src="assets.preview.source_url" />
        <p v-if="assets.url" class="outgoingLink"><a :href="outgoingSiteURL" target="_blank">View work on {{outgoingSiteType}}</a></p>
      </div>

      <div v-else-if="type==='video'" class="videoDeck">

				<video 
					ref="videojsplayer" 
					class="" 
					controls 
					controlsList="nodownload"
					preload="auto"
					v-bind:poster="assets.preview.source_url"
					>
					
					<source 
						v-bind:src="assets.media[0].vimeo.files[0].link" type="video/mp4" />

				</video>
        <p v-if="assets.url" class="outgoingLink"><a :href="outgoingSiteURL" target="_blank">View work on {{outgoingSiteType}}</a></p>
      </div>         

      <section class="meta">
        <div class="description-block">
          <p v-if="meta.description" class="description" v-html="meta.description"></p>
          <p v-if="meta.dimensions" class="dimensions" v-html="meta.dimensions"></p>
          <p v-if="meta.materials" class="materials" v-html="meta.materials"></p>      
        </div>
        <div class="labels-block"><tag-list :tags="tags" :expanded="true"/></div>
      </section>
    </div>
  </div>
</template>

<script>
  import { ref, computed, onBeforeMount, onMounted } from 'vue'  
  import { useStore } from 'vuex' 
  import { useMotion, useMotionProperties, useSpring } from '@vueuse/motion'
  import { useDrag } from '@vueuse/gesture'
  import { onKeyStroke, onKeyUp } from '@vueuse/core'

  import TagList from '@/components/TagList.vue'
    
  export default {
    name: 'PostScrim',
    components: {
      TagList
    },
    props: {
      assets: Object,
      tags: Array,
      title: String,
      author: Object,
      meta: Object,
      type: String
    },
    setup(props){
      const store = useStore()
      
      const current = ref(0)

			const isPdf = ()=>{
				try{
					return props.assets.media[0].source_url.split('.').pop().toLowerCase() === 'pdf'
				} catch(e) {
					//can't evaluate extension
					return false
				}
			}

			//animation
      const animState = ref(false);
      const animDirection = ref("")
      const isX = ref(0)
      const isY = ref(0)
      
			const makeProtocol = (str) => {
				try {
						var u = new URL(str);
						return str;
				} catch (e) {
						return "http://" + str;
				}
			}
			
			const outgoingSiteURL = ref("")
			outgoingSiteURL.value = makeProtocol(makeProtocol(props.assets.url))
			const outgoingSiteType = ref("website")
			if (typeof outgoingSiteURL.value != "undefined") {
			  try {
			    const {hostname} = new URL(outgoingSiteURL.value)
			    const outgoingSiteNamespace = (hostname.split('.').reverse()[1])
			    if (typeof outgoingSiteNamespace != "undefined") {
						switch (outgoingSiteNamespace) {
						case "youtube":
							outgoingSiteType.value = "YouTube";
							break;
						case "youtu":
							outgoingSiteType.value = "YouTube";
							break;
						case "google":
							outgoingSiteType.value = "Google Sites";
							break;
						case "glitch":
							outgoingSiteType.value = "Glitch";
							break;
						case "dropbox":
							outgoingSiteType.value = "Dropbox";
							break;
						case "dirtshare":
							outgoingSiteType.value = "Dirt Share";
							break;
						case "soundcloud":
							outgoingSiteType.value = "SoundCloud";
							break;
						case "readymag":
							outgoingSiteType.value = "Readymag";
							break;
						case "mutationfilmfest":
							outgoingSiteType.value = "Mutation Film Fest";
							break;
						case "neocities":
							outgoingSiteType.value = "Neocities";
							break;
						default:
							outgoingSiteType.value = hostname.split('.').reverse()[1] + "." + hostname.split('.').reverse()[0];
						}
			    }
			  } catch (error) {}
			}

			//animation stuff
      const dragSleeve = ref()
      const isOvershooting = ref(false)
      
      const swipeGap = parseInt(document.documentElement.clientWidth / 15, 10) // Threshold for swiping is 1/15th of the width of the screen.
      
      const dragOptions = { 
      	swipeDistance: swipeGap
      }
 
      // Bind to the element or component reference
      // and init style properties that will be animated.
      const { motionProperties } = useMotionProperties(dragSleeve, {
        cursor: 'grab',
        x: 0,
        y: 0
      })

      // Bind the motion properties to a spring reactive object.
      const { set, values } = useSpring(motionProperties)      
      
      const hideScrim = () => {
        store.commit('resetActiveScrimId')
      }   
      
      const goNext = (fromDrag) => {
        animState.value = true;
				isOvershooting.value = false;
        animDirection.value = "next"
        setTimeout(() => {
          animState.value = false
          animDirection.value = ""
          current.value = getNext()          
					set({ x: 0, y: 0});
					isOvershooting.value = fromDrag ? true : false;
        }, 401);
      }
      
      const goPrev = (fromDrag) => {
        animState.value = true;
				isOvershooting.value = false;
        animDirection.value = "prev"
        setTimeout(() => {
          animState.value = false
          animDirection.value = ""
          current.value = getPrev()          
					set({ x: 0, y: 0});
					isOvershooting.value = fromDrag ? true : false;
        }, 401);
      }
    
      const getNext = () => {
        return (current.value + 1 > props.assets.media.length - 1) ? 0 : current.value + 1
      }
      
      const getPrev = () => {
        return (current.value - 1 < 0) ? props.assets.media.length -1 : current.value - 1
      }

      onKeyUp('ArrowLeft', (e) => {
				if (props.assets.media.length > 1) {
				 goPrev()
				}
			})
      onKeyUp('ArrowRight', (e) => {
				if (props.assets.media.length > 1) {
					goNext()
				}
      })
      onKeyUp('Escape', (e)=>{
        hideScrim()
      })

			const waitForStop = () => {
        const countdown = setInterval(() => {
          if(values.x === 0 && values.y === 0) {
            stop()
          }
          isX.value = values.x
          isY.value = values.y
        },10)
        const stop = () => {
          isOvershooting.value = false;
          clearInterval(countdown)
        }
      }
      
      const dragHandler = ({ 
      	movement: [x, y], 
      	dragging, 
      	swipe
      }) => {

        const swipeLeft = swipe[0] === -1 ? true : false
        const swipeRight = swipe[0] === 1 ? true : false
        
				isX.value = values.x
        isY.value = values.y

        
        if (!dragging) {
					if (x > swipeGap) {
						goPrev(true)
						waitForStop()
						return
					}
					if (x < (-1 * swipeGap)) {
						goNext(true)
						waitForStop()
						return
					}
          set({ x: 0, y: 0, cursor: 'grab' })
					isOvershooting.value = false;
          return
        }

        set({
          cursor: 'grabbing',
          x,
          y:0,
        })
      }

      // Composable usage 
      if(props.assets.media.length>1) {
        useDrag(dragHandler, {
          domTarget: dragSleeve,
          ...dragOptions
        })  
      }
      return {hideScrim, goNext, goPrev, current, getPrev, getNext, animState, animDirection, dragSleeve, isOvershooting, outgoingSiteURL, outgoingSiteType, isPdf}
    }

    
  }
</script>

<style scoped>
	.post-scrim {
		color: #fff;
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
	}
	
	.post-scrim .scrim-shroud {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: #000;
		z-index: 0;
	}
	
	.post-scrim .title-block {
		padding: 0;
		position: relative;
	}
	
	.post-scrim .title-block .credits {
		color: #fff;
		text-transform: unset;
		font-size: 18px;
		margin-bottom: 24px;
		text-align: center;
		padding: 0 54px;
	}
	
	.post-scrim .title-block .credits .title:after {
		content: "—";
		margin: 0 0.5em;
	}
	
	.post-scrim .title-block .close {
		position: absolute;
		top: -18px;
		right: 0;
		height: 48px;
		width: 48px;
		margin: 0;
		padding: 0;
		background-color: transparent;
		background-image: url(../assets/close.svg);
		background-size: 36px 36px;
		background-repeat: no-repeat;
		background-position: center center;
		text-indent: -999vw;
		overflow: hidden;
	}
	
	.post-scrim .scrim-contents {
		padding: 48px 120px;
		position: relative;
		overflow-y: scroll;
		overflow-x: hidden;
		scrollbar-width: none;
		/* Firefox */
	}
	
	.post-scrim .scrim-contents::-webkit-scrollbar {
		width: 0;
		/* Remove scrollbar space */
		background: transparent;
		/* Optional: just make scrollbar invisible */
	}
	
	.post-scrim .scrim-contents img {
		display: block;
		width: auto;
		height: auto;
		max-height: 600px;
		pointer-events: none;
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
	}
	
	.post-scrim .scrim-contents .meta {
		margin-top: 36px;
		display: flex;
		flex-direction: row;
		width: auto;
	}
	
	.post-scrim .scrim-contents .meta .description-block {
		width: 50%;
		text-align: left;
		font-size: 18px;
		line-height: 1.333;
		padding-top: 3px;
		/* to match label spacing */
	}
	
	.post-scrim .scrim-contents .meta .labels-block {
		width: 50%;
	}
	
	.post-scrim .scrim-contents .meta .labels-block .tagList {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		flex-wrap: wrap;
	}
	
	.imageDeck {
		position: relative;
	}
	
	.dragSleeve {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	
	.imageDeck .carousel {
		position: relative;
		display: flex;
		flex-direction: row;
		touch-action: none;
	}
	
	.imageDeck .carousel.multiple {
		width: 300vw;
		max-width: unset;
	}
	
	.imageDeck.animating .carousel {
		transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}
	
	.imageDeck.prev .carousel {
		transform: translate(100vw);
	}
	
	.imageDeck.next .carousel {
		transform: translate(-100vw);
	}
	
	.realBox,
	.ghostBox {
		width: 100vw;
		display: flex;
		align-items: center;
	}
	
	.ghostBox.prev {
		order: -1;
	}
	
	.ghostBox.next {
	}
	
	.dragSleeve.overshoot .ghostBox {
		opacity: 0;
	}
	
	.paginator {
		position: absolute;
		top: 0;
		left: 0;
		font-weight: 500;
		line-height: 1;
	}
	
	.paginationDots {
		position: absolute;
		bottom: 21px;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: row;
		list-style-type: none;
		z-index: 2;
		margin: 0;
	}
	
	.paginationDots .dot {
		height: 6px;
		width: 6px;
		background-color: white;
		border-radius: 50%;
		box-shadow: 0 0 3px rgba(0,0,0,0.5);
		margin: 0 6px;
	}
	
	.paginationDots .dot.selected {
		background-color: #0000FF;
	}
	
	.imgControl {
		position: absolute;
		top: 0;
		width: 48px;
		height: 100%;
		overflow: hidden;
		text-indent: -999vw;
		background-repeat: no-repeat;
		background-size: 48px auto;
		background-color: transparent;
		background-position: center center;
		margin: 0;
		padding: 0;
		z-index: 1;
	}
	
	.imgControl.prev {
		left: 0;
		background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="48" height="48" viewBox="0, 0, 48, 48"><path d="M30,12 L18,24 L30,36" fill-opacity="0" stroke="Silver" stroke-width="2" stroke-linecap="square"/></svg>');
	}
	
	.imgControl.next {
		right: 0;
		background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="48" height="48" viewBox="0, 0, 48, 48"><path d="M18,36 L30,24 L18,12" fill-opacity="0" stroke="Silver" stroke-width="2" stroke-linecap="square"/></svg>');
	}
		
	.videoDeck video {
		width: 100%;
		height: auto;
		max-height: 600px;
	}
	
	.outgoingLink {
		font-size: 16px;
		text-align: center;
		margin-top: 1em;
	}

	.outgoingLink:after {
		content: "";
		display: inline-block;
		height: 1em;
		width: 1em;
		background-image: url('data:image/svg+xml;utf8,<svg enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="m492.703 0h-139.577c-10.658 0-19.296 8.638-19.296 19.297 0 10.658 8.638 19.296 19.296 19.296h120.281v120.281c0 10.658 8.638 19.296 19.296 19.296s19.297-8.638 19.297-19.296v-139.577c0-10.659-8.638-19.297-19.297-19.297z"/><path d="m506.346 5.654c-7.538-7.539-19.747-7.539-27.285 0l-275.297 275.296c-7.539 7.532-7.539 19.753 0 27.285 3.763 3.769 8.703 5.654 13.643 5.654 4.933 0 9.873-1.885 13.643-5.654l275.296-275.296c7.539-7.532 7.539-19.753 0-27.285z"/><path d="m427.096 239.92c-10.658 0-19.297 8.638-19.297 19.296v214.191h-369.206v-369.206h214.191c10.658 0 19.296-8.638 19.296-19.296s-8.638-19.297-19.296-19.297h-233.487c-10.659 0-19.297 8.638-19.297 19.297v407.799c0 10.658 8.638 19.296 19.297 19.296h407.799c10.664 0 19.296-8.638 19.296-19.297v-233.487c0-10.658-8.638-19.296-19.296-19.296z"/></svg>');
		background-repeat: no-repeat;
		background-size: 0.8em auto;
		background-position: right bottom;
		margin-left: 0.25em;
		line-height: 1;
	}
	
	@media screen and (max-width: 767px) {
		.post-scrim .scrim-contents {
			padding: 36px 24px;
		}
		
		.post-scrim .scrim-contents img {
			max-width: calc(100vw - 48px);
		}
		
		.post-scrim .title-block {
		}
		
		.post-scrim .title-block .credits {
			text-align: left;
			padding: 0 54px 0 0;
		}
		
		.post-scrim .title-block .credits .title {
			font-size: 32px;
		}
		
		.post-scrim .title-block .credits .title:after {
			content: none;
		}
		
		.post-scrim .title-block .credits .author {
			display: block;
			font-size: 14px;
			font-weight: 300;
			margin-top: 0.5em;
		}
		
		.post-scrim .title-block .paginator {
			position: static;
			display: block;
			margin-bottom: 9px;
			font-weight: 300;
			font-size: 13px;
		}
		
		.post-scrim .title-block .close {
			top: -12px;
			right: -3px;
		}
		
		.post-scrim .scrim-contents .meta {
			flex-direction: column;
		}
			
		.post-scrim .scrim-contents .meta .labels-block {
			order: -1;
			width: auto;
			margin-bottom: 36px;
		}
		
		.post-scrim .scrim-contents .meta .description-block {
			width: auto;
		}
	}
</style>
