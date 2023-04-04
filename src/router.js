import { createRouter, createWebHistory } from 'vue-router'
import Operations from '@/views/Operations.vue'
import OperationDetails from '@/views/OperationDetails.vue'

const routes = [
  {
    path: '/',
    redirect: '/operations'
  },
  {
    path: '/operations',
    name: 'Operations',
    component: Operations
  },
  {
    path: '/operations/:id',
    name: 'OperationDetails',
    component: OperationDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router