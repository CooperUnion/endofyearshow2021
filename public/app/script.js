/* global Vue, VueRouter, httpVueLoader, vuescroll, Vuex */
// const Home = httpVueLoader('/templates/Home.vue')
// const Category = httpVueLoader('/templates/Category.vue')
// const Tags = httpVueLoader('/templates/Tags.vue')
// const Areas = httpVueLoader('/templates/Areas.vue')
// const Students = httpVueLoader('/templates/Students.vue')
// const Student = httpVueLoader('/templates/Student.vue')
// const Work = httpVueLoader('/templates/Work.vue')

// desktop
const Home = httpVueLoader('/app/templates/Home.vue')
const Post = httpVueLoader('/app/templates/Post.vue')

// const DesktopStudent = httpVueLoader('/templates/DesktopStudent.vue')
// const DesktopStudents = httpVueLoader('/templates/DesktopStudents.vue')
// const DesktopTags = httpVueLoader('/templates/DesktopTags.vue')
// const DesktopWork = httpVueLoader('/templates/DesktopWork.vue')
// const DesktopCategory = httpVueLoader('/templates/DesktopCategory.vue')


// const Test = httpVueLoader('/templates/Test.vue')

Vue.config.devtools = true



Vue.use(VueRouter)
Vue.use(Vuex)

// Vuex configuration
const store = new Vuex.Store({
  state: {
    displayUI: true,
    displayNav: false
  },
  mutations: {
    toggleUI(state){
      state.displayUI = state.displayUI === false
    },
    showUI(state){
      state.displayUI = true
    },
    hideUI(state){
      state.displayUI = false
    },
    showNav(state){
      state.displayNav = true
    },
    hideNav(state){
      state.displayNav = false
    }

  }
})

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})


const routes = [
  // {path: '/category/students', component: DesktopStudents},
  // {path: '/category/areas', component: Areas},
  // {path: '/category/:category', component: DesktopCategory},
  // {path: '/tags/areas', component: Areas},
  // {path: '/tags/:tag', component: DesktopTags},
  // {path: '/student/:student', component: DesktopStudent},  
  // {path: '/work/:work', component: DesktopWork},    
  // {path: '/test', component: Test},
  {path: '/app', component: Home},
  {path: '/app/post/:id', component: Post},
  // {path: '/desktop', component: Desktop}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

let $route = router.match(location)

// console.log("matched path", $route.path)


const app = new Vue({
  store,
  router,
  template:`<router-view />`
}).$mount('#app')