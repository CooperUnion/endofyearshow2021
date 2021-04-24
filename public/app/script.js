/* global Vue, VueRouter, httpVueLoader, vuescroll, Vuex */
const Home = httpVueLoader('/app/templates/Home.vue')
// const Category = httpVueLoader('/templates/Category.vue')
// const Tags = httpVueLoader('/templates/Tags.vue')
// const Areas = httpVueLoader('/templates/Areas.vue')
// const Students = httpVueLoader('/templates/Students.vue')
// const Student = httpVueLoader('/templates/Student.vue')
// const Work = httpVueLoader('/templates/Work.vue')

// desktop
// const Desktop = httpVueLoader('/templates/Desktop.vue')


// const Test = httpVueLoader('/templates/Test.vue')

Vue.config.devtools = true

Vue.use(VueRouter)
Vue.use(Vuex)

//Vuex configuration
const store = new Vuex.Store({
  state: {
    displayUI: true
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
  // {path: '/category/students', component: Students},
  // {path: '/category/areas', component: Areas},
  // {path: '/category/:category', component: Category},
  // {path: '/tags/areas', component: Areas},
  // {path: '/tags/:tag', component: Tags},
  // {path: '/student/:student', component: Student},  
  // {path: '/work/:work', component: Work},    
  // {path: '/test', component: Test},
  {path: '/', component: Home},
  // {path: '/desktop', component: Desktop}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

let $route = router.match(location)

// console.log("matched path", $route.path)

console.log(router)
const app = new Vue({
  store,
  router,
  template:`<router-view />`
}).$mount('#app')
