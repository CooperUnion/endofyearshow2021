import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import mitt from 'mitt'
import { VueMasonryPlugin } from 'vue-masonry/src/masonry-vue3.plugin';
import MobileDetect from 'mobile-detect'

// const detection = new MobileDetect(req.headers['user-agent'])
// console.log("is the device desktop?", detection.mobile() === null)

const emitter = mitt()
let app = createApp(App).use(store).use(router)
app.config.globalProperties.emitter = emitter
app.config.globalProperties.api_endpoint = process.env.VUE_APP_FORM_API_ENDPOINT || 'https://eoys-api-2021.glitch.me'
app.use(VueMasonryPlugin)
app.mount('#app')


