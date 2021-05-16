import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import MasonryPosts from '@/views/MasonryPosts.vue'
import MasonryPost from '@/views/MasonryPost.vue'
import MasonryTag from '@/views/MasonryTag.vue'

let routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
    path: '/app',
    redirect: { name: 'MasonryPosts'}
  }
]

let globalNavItems = [
  {name:"Areas", path:"/areas", component: MasonryPosts},
  {name:"Foundation", path:"/foundation", component: Home},
  {name:"Projects", path:"/projects", component: Home},
  {name:"Forum", path:"/forum", component: Home},
  {name:"Students", path:"/students", component: Home},
  {name:"Info", path:"/info", component: Home}
]

routes = routes.concat(globalNavItems)



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export {router as default, globalNavItems}