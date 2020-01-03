import Vue from 'vue'
import VueRouter from 'vue-router'
import FilesPage from '../views/Filespage.vue'
import RecorderPage from '../views/Recorderpage.vue'
import SettingsPage from '../views/Settingspage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/files',
    name: 'FilesPage',
    component: FilesPage
  },
  {
    path: '/',
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
