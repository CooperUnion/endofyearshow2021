import { getCurrentInstance } from 'vue'

const internalInstance = getCurrentInstance()
const { mobile } = internalInstance.appContext.config.globalProperties

export default mobile