import Vue from 'vue'
import VueRouter from 'vue-router'
import SamplerPage from '../views/Samplerpage.vue'
import RecorderPage from '../views/Recorderpage.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
