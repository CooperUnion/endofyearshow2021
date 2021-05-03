import * as Vue from './js/vue@3.0.11/dist/vue.esm-browser.min.js'
import VueRouter from './js/vue-router@3.5.1/dist/vue-router.esm.browser.min.js'
import { loadModule } from './js/vue3-sfc-loader@0.7.3/dist/vue3-sfc-loader.esm.js'
import Vuex from './js/vuex@3.6.2/dist/vuex.esm.browser.min.js'


console.log("loaded fine")


const AsyncComp = Vue.defineAsyncComponent(() =>
  import('./components/count.vue')
)


Vue.createApp({
  // ...
  components: {
    count: AsyncComp
  },
  template:'<count></count>'
}).mount("#app")

// import count from './components/count.vue.js'

// const options = {
//   moduleCache: {
//     vue: Vue
//   },
//   async getFile(url) {
//     const res = await fetch('https://eoys-uploader-2021.glitch.me/app3/components/'+url);
//     // if ( !res.ok ) throw Object.assign(new Error(res.statusText + ' ' + url), { res });
//     return await res.text();
//   },
//   addStyle(textContent) {

//     const style = Object.assign(document.createElement('style'), { textContent });
//     const ref = document.head.getElementsByTagName('style')[0] || null;
//     document.head.insertBefore(style, ref);
//   }
// }
 
//  const app = Vue.createApp({
//   components: {
//     'my-component': Vue.defineAsyncComponent( () => loadModule('./count.vue.js', options) )
//   },
//   template: '<my-component></my-component>'
// }).mount("#app");

// const options = {
//   moduleCache: { vue: Vue },
//   getFile: () => `
//   <template>
//     vue3-sfc-loader esm version
//       <button @click="count++">count is: {{ count }} {{name}}</button>

//   </template>
//   <script>
//     import { ref } from "vue";
//     export default {
//       setup() {
//         const name = ref('Name etc');
//         const count = ref(0)
//         return { name, count };
//       }
//     };
//   </script>
//   `,
//   addStyle: () => {},
// }

// Vue.createApp(Vue.defineAsyncComponent(() => loadModule('file.vue', options))).mount(document.body);

