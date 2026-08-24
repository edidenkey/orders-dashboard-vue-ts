export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  productId: string
  name: string
  qty: number
  price: number
}

export interface Order {
  id: string
  reference: string
  customer: {
    id: string
    name: string
    email?: string
  }
  items: OrderItem[]
  total: number
  status: OrderStatus
  createdAt: string
  updatedAt?: string
  history?: { status: OrderStatus; at: string; by?: string }[]
}
