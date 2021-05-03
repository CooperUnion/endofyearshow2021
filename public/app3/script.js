import * as Vue from './js/vue@3.0.11/dist/vue.esm-browser.min.js'
import { createRouter } from './js/vue-router@4.0.6/dist/vue-router.esm-browser.min.js'
import { loadModule } from './js/vue3-sfc-loader@0.7.3/dist/vue3-sfc-loader.esm.js'
import Vuex from './js/vuex@4.0.0/dist/vuex.esm-browser.prod.js'
import options from './js/loadModuleOptions.js'

console.log("loaded fine")

// Vue.devtools.config = true
 
const app = Vue.createApp({
  components: {
    'count': Vue.defineAsyncComponent( () => loadModule('./count.vue', options) ),
    'anotherCount': Vue.defineAsyncComponent( () => loadModule('./anotherCount.vue', options) ),
    'Home': Vue.defineAsyncComponent( () => loadModule('./Home.vue', options) )
  },
  template: `
    <count color="red"></count>
    <anotherCount></anotherCount>
    <home></home>
  `
}).mount("#app");
// app.config.devtools = true
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor
window.postMessage({
  devtoolsEnabled: true,
  vueDetected: true
}, '*')