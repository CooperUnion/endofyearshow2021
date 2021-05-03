import * as Vue from './js/vue@3.0.11/dist/vue.esm-browser.min.js'
import VueRouter from './js/vue-router@3.5.1/dist/vue-router.esm.browser.min.js'
import { loadModule } from './js/vue3-sfc-loader@0.7.3/dist/vue3-sfc-loader.esm.js'
import Vuex from './js/vuex@3.6.2/dist/vuex.esm.browser.min.js'
import options from './js/loadModuleOptions.js'

console.log("loaded fine")

 
const app = Vue.createApp({
  components: {
    'count': Vue.defineAsyncComponent( () => loadModule('./count.vue', options) ),
    'anotherCount': Vue.defineAsyncComponent( () => loadModule('./anotherCount.vue', options) )
  },
  template: `
    <count></count>
    <anotherCount></anotherCount>
  `
}).mount("#app");
app.config.devtools = true
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor
