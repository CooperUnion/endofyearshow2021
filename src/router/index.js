import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
// import Posts from '@/views/Posts.vue'
// import Post from '@/views/Post.vue'
//import Masonry from '@/views/Masonry.vue'
import MasonryPosts from '@/views/MasonryPosts.vue'
import MasonryPost from '@/views/MasonryPost.vue'
import MasonryTag from '@/views/MasonryTag.vue'

import navItems from '@/router/navItems.js'

const routes = [
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

// .concat(navItems.map((navItem)=>{
//   const {name, url:fullPath} = navItem
//   const component = MasonryPosts
//   const path = '/tag/:tag'
//   const props = true
  
//   return {
//     path,
//     name,
//     component,
//     props
//   }
// }))

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
