import { createRouter, createWebHashHistory } from 'vue-router'

import Main from '../components/Main.vue'
import Edit from '../components/Edit.vue'

const routes = [
  { path: '/', redirect: '/main' },
  { path: '/main', component: Main },
  { path: '/edit', component: Edit },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router