import Vue from 'vue'
import Ionic from '@ionic/vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Ionic)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
