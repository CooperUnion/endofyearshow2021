import options from './loadModuleOptions.mjs'
import { loadModule } from '../vue3-sfc-loader@0.7.3/dist/vue3-sfc-loader.esm.js'

export default async function (filePath) {

  try {
    
    const loadedModule = loadModule(filePath, options)
    return loadedModule
  } catch (e) {
    console.log(e)
  }
  // return loadModule(filePath, options)
}