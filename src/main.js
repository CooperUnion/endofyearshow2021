import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import 'https://cdn.jsdelivr.net/gh/yegor256/tacit@gh-pages/tacit-css-1.5.5.min.css';

createApp(App).use(store).use(router).mount('#app')
