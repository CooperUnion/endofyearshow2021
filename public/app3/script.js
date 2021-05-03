import * as Vue from './js/vue@3.0.11/dist/vue.esm-browser.min.js'
import VueRouter from './js/vue-router@3.5.1/dist/vue-router.esm.browser.min.js'
import { loadModule } from './js/vue3-sfc-loader@0.7.3/dist/vue3-sfc-loader.esm.js'
import Vuex from './js/vuex@3.6.2/dist/vuex.esm.browser.min.js'


console.log("loaded fine")

const Counter = {
  data() {
    return {
      counter: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.counter++
      console.log(this.counter)
    }, 1000)
  }
}

Vue.createApp(Counter).mount('#counter')