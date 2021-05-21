import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import mitt from 'mitt'
import { VueMasonryPlugin } from "vue-masonry/src/masonry-vue3.plugin";

const emitter = mitt()
let app = createApp(App).use(store).use(router)
app.config.globalProperties.emitter = emitter
app.config.globalProperties.api_endpoint = 'https://eoys-api-2021.glitch.me'
app.use(VueMasonryPlugin)
app.mount('#app')


