<template>
  <div>
    <v-data-table :items="orders" :loading="loading" class="elevation-1">
      <template #top>
        <div class="d-flex justify-space-between">
          <div>
            <strong>Page {{ page }} — Total: {{ total }}</strong>
          </div>
          <div>
            <v-pagination v-model="localPage" :length="pageCount" @update:modelValue="onPageChange" />
          </div>
        </div>
      </template>

      <template #item.status="{ item }">
        <v-chip :color="statusColor(item.status)" small>{{ item.status }}</v-chip>
      </template>

      <template #item.actions="{ item }">
        <v-btn small text @click="goTo(item.id)">Détails</v-btn>
      </template>

      <template #no-data>
        <div class="pa-4">Aucune commande trouvée.</div>
      </template>

      <v-data-table-column field="reference" title="Référence" />
      <v-data-table-column field="customer.name" title="Client" />
      <v-data-table-column field="total" title="Total" />
      <v-data-table-column field="status" title="Statut" />
      <v-data-table-column field="actions" title="Actions" />
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchOrders } from '../api/orders'
import type { Order } from '../types/order'

const props = defineProps({
  search: String,
  status: String,
  page: { type: Number, required: true },
  limit: { type: Number, default: 10 }
})
const emit = defineEmits(['update:page'])

const router = useRouter()
const orders = ref<Order[]>([])
const loading = ref(false)
const total = ref(0)
const localPage = ref(props.page)
const pageCount = ref(1)

watch(() => props.page, v => (localPage.value = v))

async function load() {
  loading.value = true
  try {
    const params: any = {
      _page: props.page,
      _limit: props.limit
    }
    if (props.search) params.q = props.search
    if (props.status) params.status = props.status

    const res = await fetchOrders(params)
    orders.value = res.data
    const totalItems = Number(res.headers['x-total-count'] ?? orders.value.length)
    total.value = totalItems
    pageCount.value = Math.max(1, Math.ceil(totalItems / props.limit))
  } catch (err) {
    orders.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch([() => props.search, () => props.status, () => props.page], load)

function onPageChange(v: number) {
  emit('update:page', v)
}

function goTo(id: string) {
  router.push({ name: 'order', params: { id } })
}

function statusColor(status: string) {
  switch (status) {
    case 'pending':
      return 'orange'
    case 'processing':
      return 'blue'
    case 'shipped':
      return 'purple'
    case 'delivered':
      return 'green'
    case 'cancelled':
      return 'red'
    default:
      return 'grey'
  }
}
</script>
