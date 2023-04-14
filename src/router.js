import { createRouter, createWebHistory } from 'vue-router'
import Operations from '@/views/Operations.vue'
import OperationDetails from '@/views/OperationDetails.vue'

import NFTDocumentDetails from '@/views/NFTDocumentDetails.vue'
import NFTDocuments from '@/views/NFTDocuments.vue'


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
  },

  {
    path: '/nft',
    name: 'NFTDocuments',
    component: NFTDocuments
  },
  {
    path: '/nft/:id',
    name: 'NFTDocumentDetails',
    component: NFTDocumentDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router