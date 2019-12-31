import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueRecord from '@codekraft-studio/vue-record'

Vue.config.productionTip = false
Vue.use(VueRecord)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
