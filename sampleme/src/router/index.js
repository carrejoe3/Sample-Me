import Vue from 'vue'
import VueRouter from 'vue-router'
import SamplerPage from '../views/Samplerpage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SamplerPage',
    component: SamplerPage
  }
]

const router = new VueRouter({
  routes
})

export default router
