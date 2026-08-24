import { defineStore } from 'pinia'
import type { Order, OrderStatus } from '../types/order'
import { fetchOrders, fetchOrder, updateOrderStatus } from '../api/orders'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [] as Order[],
    total: 0,
    page: 1,
    limit: 10,
    search: '' as string,
    status: null as OrderStatus | null,
    loading: false,
    error: null as string | null,
    selectedOrder: null as Order | null
  }),

  actions: {
    async loadOrders() {
      this.loading = true
      this.error = null

      try {
        const params: any = {
          _page: this.page,
          _limit: this.limit
        }

        if (this.search) params.q = this.search
        if (this.status) params.status = this.status

        const res = await fetchOrders(params)
        this.orders = res.data as Order[]
        this.total = Number(res.headers['x-total-count'] ?? this.orders.length)
      } catch (err: any) {
        this.error = err?.message ?? String(err)
        this.orders = []
        this.total = 0
      } finally {
        this.loading = false
      }
    },

    async loadOrder(id: string) {
      this.loading = true
      this.error = null
      try {
        const o = await fetchOrder(id)
        this.selectedOrder = o
        return o
      } catch (err: any) {
        this.error = err?.message ?? String(err)
        this.selectedOrder = null
        throw err
      } finally {
        this.loading = false
      }
    },

    setPage(p: number) {
      this.page = p
      return this.loadOrders()
    },

    setSearch(s: string) {
      this.search = s
      this.page = 1
      return this.loadOrders()
    },

    setStatus(st: OrderStatus | null) {
      this.status = st
      this.page = 1
      return this.loadOrders()
    },

    /**
     * Update status with optimistic UI and rollback on error.
     * Returns the updated Order on success, throws on failure.
     */
    async updateStatus(id: string, newStatus: OrderStatus) {
      this.error = null

      // apply optimistic update in list
      const idx = this.orders.findIndex(o => o.id === id)
      const prev = idx >= 0 ? this.orders[idx].status : null

      const prevSelected = this.selectedOrder?.status ?? null

      if (idx >= 0) this.orders[idx].status = newStatus
      if (this.selectedOrder?.id === id) this.selectedOrder.status = newStatus

      try {
        const updated = await updateOrderStatus(id, newStatus)
        // ensure local copy reflects server (e.g., updatedAt)
        if (idx >= 0) this.orders[idx] = { ...this.orders[idx], ...updated }
        if (this.selectedOrder?.id === id) this.selectedOrder = { ...this.selectedOrder!, ...updated }

        return updated
      } catch (err: any) {
        // rollback
        if (idx >= 0 && prev !== null) this.orders[idx].status = prev
        if (this.selectedOrder?.id === id && prevSelected !== null) this.selectedOrder.status = prevSelected

        this.error = err?.message ?? String(err)
        throw err
      }
    }
  }
})
