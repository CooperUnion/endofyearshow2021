import { createRouter, createWebHistory } from 'vue-router'
import { Casco } from 'vue-casco'

import Home from '@/views/Home.vue'
import MasonryPosts from '@/views/MasonryPosts.vue'
import MasonryPost from '@/views/MasonryPost.vue'
import MasonryTag from '@/views/MasonryTag.vue'
import Projects from '@/views/Projects.vue'
import Project from '@/views/Project.vue'
import Students from '@/views/Students.vue'
import Student from '@/views/Student.vue'
import Info from '@/views/Info.vue'

import SocketDebug from '@/views/SocketDebug.vue'
import MotionDebug from '@/views/MotionDebug.vue'

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
    path: '/posts',
    name: 'MasonryPosts',
    component: MasonryPosts,
    props: true
  }, 
  {
    path: '/posts/:post',
    name: 'MasonryPost',
    component: MasonryPost,
    props: true
  },
  {
    path: '/tag/:tag',
    name: 'MasonryPostsTag',
    component: MasonryTag,
    props: true
  },  
  {
    path: '/app/post/:post',
    redirect: { name: 'MasonryPost' }
  },
  {
    path: '/app/',
    redirect: { name: 'MasonryPosts'}
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
  {
    path: '/cursors',
    name: 'Cursors',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Cursors.vue')
  },
]

let globalNavItems = [
//   {name:"Home", path:"/", component: Home},
  {name:"Areas", path:"/areas", component: MasonryPosts},
  {
    name:"Foundation", 
    path:"/foundation", 
    component: MasonryPosts,
    props:{
      postsEndpoint: '/year/freshman'
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
  {name: "🔌", path: "/SocketDebug", component: SocketDebug },
  {name: "🔛", path: "/MotionDebug", component: MotionDebug }
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