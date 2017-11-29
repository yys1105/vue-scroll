import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import http from './config/http'
import router from './router'

Vue.use(http)

FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
