import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axiosPlugin from './plugins/axios'
import ripple from './directives/v-ripple/index'
import drag from './directives/v-drag/index'

createApp(App)
.use(axiosPlugin)
.use(store)
.use(router)
.directive(ripple.name,ripple.config)
.directive(drag.name,drag.config)
.mount('#app')
