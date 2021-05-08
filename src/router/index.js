import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'
import Post from '../views/Post.vue'
import Masonry from '../views/Masonry.vue'
import MasonryPost from '../views/MasonryPost.vue'

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
    name: 'Posts',
    component: Posts
  },
  {
    path: '/posts/:post',
    name: 'Post',
    component: Post,
    props: true
  },
  {
    path: '/masonry',
    name: 'Masonry',
    component: Masonry,
    props: true
  },  
  {
    path: '/masonry/:post',
    name: 'MasonryPost',
    component: MasonryPost,
    props: true
  },  
  {
    path: '/app/post/:post',
    redirect: { name: 'MasonryPost' }
  },
  {
    path: '/app/',
    redirect: { name: 'Masonry'}
  },
  {
    path: '/app',
    redirect: { name: 'Masonry'}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router