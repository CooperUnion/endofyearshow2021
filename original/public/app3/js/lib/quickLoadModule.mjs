import options from './loadModuleOptions.mjs'
import { loadModule } from '../vue3-sfc-loader@0.7.3/dist/vue3-sfc-loader.esm.js'

async function quickLoad(filePath) {
    return loadModule(filePath, options)
}

export { quickLoad }

// export default quickLoad