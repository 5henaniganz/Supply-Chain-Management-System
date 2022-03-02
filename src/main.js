import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import Moralis from './plugins/moralis'

createApp(App).provide('$moralis', Moralis).use(store).use(router).mount('#app')
