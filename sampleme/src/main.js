import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueRecord from '@codekraft-studio/vue-record'
import Ionic from '@ionic/vue'

Vue.config.productionTip = false
Vue.use(VueRecord)
Vue.use(Ionic)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
