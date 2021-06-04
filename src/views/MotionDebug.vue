<template>
  <h1>all items</h1>
  <ul>
    <li v-for="item in items" v-bind:key="item.id" class="item">
        {{item.name}}
    </li>
  </ul>

  <h1>just an active item</h1>
  <ul>
    <li class="item" ref="carousel" v-drag="dragHandler">
        {{items[current].name}}
    </li>
  </ul>
  <b @click="prev(items.indexOf(current))">prev</b> | <b @click="next(items.indexOf(current))">next</b>
</template>

<script>

  import { ref, computed } from 'vue'
  import { useMotion, useMotionProperties, useSpring, useDrag } from '@vueuse/motion'
  import { onKeyStroke, onKeyUp } from '@vueuse/core'

  export default {
    name: 'MotionDebug',
    components: {},
    setup(){

      //generic setup of the carousel and navigating it
      const current = ref(0)
      const items = [
        {id:1, name:'item 1'},
        {id:2, name:'item 2'},
        {id:3, name:'item 3'}
      ]

      const next = () => {
        current.value = (current.value + 1 > items.length - 1) ? 0 : current.value + 1
      }
      
      const prev = () => {
        current.value = (current.value - 1 < 0) ? items.length -1 : current.value - 1
      }

      onKeyUp('ArrowLeft', (e) => {
        next()
      })
      onKeyUp('ArrowRight', (e) => {
        prev()
      })
      onKeyUp('Escape', (e)=>{
        console.log("escaped!")
      })
      //animation stuff
      const carousel = ref()

      // Bind to the element or component reference
      // and init style properties that will be animated.
      const { motionProperties } = useMotionProperties(carousel, {
        cursor: 'grab',
        x: 0,
        y: 0,
      })

      // Bind the motion properties to a spring reactive object.
      const { set } = useSpring(motionProperties)
              
      const dragHandler = ({ movement: [x, y], dragging, swipe, tap }) => {

        // console.log(swipe, tap)

        const swipeLeft = swipe[0] === -1 ? true : false
        const swipeRight = swipe[0] === 1 ? true : false

        console.log({swipeLeft, swipeRight})
        if(swipeLeft) prev()
        if(swipeRight) next()

        console.log("handling")
        if (!dragging) {
          console.log("not dragging")
          set({ x: 0, y: 0, cursor: 'grab' })
          return
        }

        console.log("dragging, I guess?")
        set({
          cursor: 'grabbing',
          x,
          y,
        })
      }

      // Composable usage
      // This breaks things, for some reason
      // useDrag(dragHandler, {
      //   domTarget: carousel,
      // })    
      
      return {items, next, prev, current, carousel, dragHandler}
    }
  }
</script>
<style scoped>

  ul {
    margin:5px;
    display: flex;
    flex-direction: row;
    list-style-type: none;
  }

  .item {
    margin: 5px;
    padding: 5px;
    font-weight: bold;
    background-color: black;
    color: white;
    width: 100px;
    height: 100px;
  }
</style>