import { createRouter, createWebHistory } from 'vue-router'
import { Casco } from 'vue-casco'

import Home from '@/views/Home.vue'
import MasonryPosts from '@/views/MasonryPosts.vue'
// import MasonryPost from '@/views/MasonryPost.vue'
// import MasonryTag from '@/views/MasonryTag.vue'
import Projects from '@/views/Projects.vue'
import Project from '@/views/Project.vue'
// import newCursors from '@/components/Cursors-attempt-rightvue.vue'
import Students from '@/views/Students.vue'
import Student from '@/views/Student.vue'
import Info from '@/views/Info.vue'

import DebugSocket from '@/views/DebugSocket.vue'
import DebugMotion from '@/views/DebugMotion.vue'
import DebugPath from '@/views/DebugPath.vue'
import DebugCursorDisplay from '@/views/DebugCursorDisplay.vue'


const casco = new Casco(['default'])

let routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: {
      theme: 'dark'
    }
  },
  {
    path: '/info',
    name: 'Info',
    component: Info,
    props: true
  },
  {
    path: '/tag/:tag',
    name: 'Area',
    component: MasonryPosts,
    props: (route) =>{
      return {
        tag: route.params.tag,
        postsEndpointSuffix: `tags/${route.params.tag}`
      }
    }
  },  
  {
    path: '/tag',
    redirect: { name: 'Areas'}
  },
  {
    path: '/projects/:project',
    name: 'Project',
    component: Project,
    props: true
  },
  {
    path: '/areas',
    redirect: '/tag/drawing,design,film-+-video,installation,painting,performance,photography,printmaking,sculpture,sound-art'
  },
  {
    path: '/student/:student',
    name: 'Student',
    component: Student,
    props: true
  },
  // {
  //   path: '/cursors',
  //   name: 'Cursors',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Cursors.vue')
  // },
  {
    name: "🚶/urlParam", 
    path: "/DebugPath/:test", 
    component: DebugPath,
    props: true
  },
  {
    name: "🚶/function", 
    path: "/DebugPath/function/:test", 
    component: DebugPath,
    props: (route) =>{
      return {
        test: `The test url param is: ${route.params.test}`
      }
    }
  }
]

let globalNavItems = [
//   {name:"Home", path:"/", component: Home},
  {name:"Areas", path:"/areas", component: MasonryPosts},
  {
    name:"Foundation", 
    path:"/foundation", 
    component: MasonryPosts,
    props:{
      postsEndpointSuffix: 'year/freshman'
    }
  },
  {name:"Projects", path:"/projects/", component: Projects},
  // {name:"Forum", path:"/forum", component: MasonryPosts},
  {name:"Students", path:"/students", component: Students},
  {
    name:"Info", 
    path:"/info", 
    component: Info,
    props: {
      theme: ['dark','fancy']
    }
  },

  {name: "🔌", path: "/DebugSocket", component: DebugSocket },
  {name: "🔛", path: "/DebugMotion", component: DebugMotion },
  {name: "DBCD", path:"/DebugCursorDisplay", component: DebugCursorDisplay},
  // {name: "🖱️", path: "/DebugCursor", component: DebugCursor},
  {
    name: "🚶", 
    path: "/DebugPath", 
    component: DebugPath,
    props: {
      test: "A string set in the router"
    }
  }
]

routes = routes.concat(globalNavItems)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  try{ 
    const props = to.matched[0].props.default
    casco.set(props.theme)
  } catch(e) {
    casco.reset()
  }
  next()
})

export {router as default, globalNavItems}