<template>
  <h1>all items</h1>
  <ul>
    <li v-for="item in items" v-bind:key="item.id" class="item">
        {{item.name}}
    </li>
  </ul>

  <h1>just an active item</h1>
  <ul>
    <li class="item" ref="carousel">
        {{items[current].name}}
    </li>
  </ul>
  <b @click="prev(items.indexOf(current))">prev</b> | <b @click="next(items.indexOf(current))">next</b>

  <h1>is the obj active? {{isActive}}</h1>
  <h1>is the obj moving? {{isActive}}</h1>
  <h1>donde estas? {{isX}}, {{isY}}</h1>

</template>

<script>

  import { ref, computed } from 'vue'
  import { useMotion, useMotionProperties, useSpring } from '@vueuse/motion'
  import { useDrag } from '@vueuse/gesture'
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
      const isActive = ref(false)
      const isMoving = ref(false)
      const isX = ref(0)
      const isY = ref(0)

      // Bind to the element or component reference
      // and init style properties that will be animated.
      const { motionProperties } = useMotionProperties(carousel, {
        cursor: 'grab',
        x: 0,
        y: 0,
      })

      // Bind the motion properties to a spring reactive object.
      const { set, values } = useSpring(motionProperties)
      
      const dragEnd = () =>{
        const countdown = setInterval(()=>{
          if(values.x === 0 && values.y === 0) {
            stop()
          }
          isX.value = values.x
          isY.value = values.y
        },10)

        const stop = ()=>{
          console.log("stopping")
          clearInterval(countdown)
        }
      }

      const dragHandler = (everything) => {
        // console.log(Object.keys(everything))
        const { movement: [x, y], dragging, swipe, tap, active, moving } = everything

        let hasDraggedStopped = false
        // console.log(swipe, tap)
        
        isX.value = values.x
        isY.value = values.y
        
        // help the template know if an object is in motion
        isActive.value = active
        isMoving.value = moving

        const swipeLeft = swipe[0] === -1 ? true : false
        const swipeRight = swipe[0] === 1 ? true : false

        console.log({swipeLeft, swipeRight})
        if(swipeLeft) prev()
        if(swipeRight) next()

        console.log("handling")
        if (!dragging) {
          console.log("not dragging")
          set({ x: 0, y: 0, cursor: 'grab' })
          dragEnd()
          return
        }

        if(!hasDraggedStopped) {

          console.log("dragging, I guess?")
          set({
            cursor: 'grabbing',
            x,
            y,
          })
        }
      }

      // Composable usage
      useDrag(dragHandler, {
        domTarget: carousel,
      })    
      
      return {items, next, prev, current, carousel, dragHandler, isActive, isMoving, isX, isY}
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