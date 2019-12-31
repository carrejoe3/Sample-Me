import Vue from 'vue'
import VueRouter from 'vue-router'
import SamplerPage from '../views/Samplerpage.vue'
import RecorderPage from '../views/Recorderpage.vue'
import SettingsPage from '../views/Settingspage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SamplerPage',
    component: SamplerPage
  },
  {
    path: '/recorder',
    name: 'RecorderPage',
    component: RecorderPage
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: SettingsPage
  }
]

const router = new VueRouter({
  routes
})

export default router
