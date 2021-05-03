import * as Vue from '../vue@3.0.11/dist/vue.esm-browser.min.js'
import options from '../loadModuleOptions.js'
import { loadModule } from '../vue3-sfc-loader@0.7.3/dist/vue3-sfc-loader.esm.js'

async function quickLoad (filePath) {
  return Vue.defineAsyncComponent( () => loadModule(filePath, options) )
}


export default { quickLoad }