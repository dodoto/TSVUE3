import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axiosPlugin from './plugins/axios'
import Ripple from './directives/v-ripple/index'
import Drag from './directives/v-drag/index'

createApp(App)
.use(axiosPlugin)
.use(store)
.use(router)
.use(Drag)
.use(Ripple)
.mount('#app')
