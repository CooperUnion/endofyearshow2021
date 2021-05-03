import options from '../loadModuleOptions.js'
import { loadModule } from '../vue3-sfc-loader@0.7.3/dist/vue3-sfc-loader.esm.js'

async function quickLoad (filePath) {
  return loadModule(filePath, options)
}

export default quickLoad