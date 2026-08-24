import { client } from './client'
import type { Order, OrderStatus } from '../types/order'

export async function fetchOrders(params: Record<string, any>) {
  const res = await client.get('/orders', { params })
  return res
}

export async function fetchOrder(id: string) {
  const res = await client.get<Order>(`/orders/${id}`)
  return res.data
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const res = await client.patch<Order>(`/orders/${id}`, { status, updatedAt: new Date().toISOString() })
  return res.data
}
