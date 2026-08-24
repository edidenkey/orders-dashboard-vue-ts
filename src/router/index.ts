import { createRouter, createWebHistory } from 'vue-router'
import OrdersView from '../views/OrdersView.vue'
import OrderView from '../views/OrderView.vue'

const routes = [
  { path: '/', name: 'orders', component: OrdersView },
  { path: '/orders/:id', name: 'order', component: OrderView, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
