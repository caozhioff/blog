import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
import router from './router/index.js'
import axios from './util/axios'

Vue.use(ElementUI)

Vue.prototype.$axios = axios;


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
