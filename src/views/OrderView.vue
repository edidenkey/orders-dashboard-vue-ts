<template>
  <v-container class="pa-6">
    <v-row>
      <v-col cols="12">
        <v-btn text @click="$router.push('/')">← Retour</v-btn>
        <h2>Détails de la commande</h2>
      </v-col>

      <v-col cols="12" v-if="loading">
        <v-progress-circular indeterminate /> Chargement...
      </v-col>

      <v-col cols="12" v-else-if="error">
        <p class="error">Erreur lors du chargement: {{ error }}</p>
      </v-col>

      <v-col cols="12" v-else-if="!order">
        <p>Commande introuvable.</p>
      </v-col>

      <v-col cols="12" v-else>
        <OrderDetail :order="order" @changeStatus="onChangeStatus" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import OrderDetail from '../components/OrderDetail.vue'
import { fetchOrder, updateOrderStatus } from '../api/orders'
import type { Order } from '../types/order'

const route = useRoute()
const router = useRouter()
const id = String(route.params.id)

const order = ref<Order | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    order.value = await fetchOrder(id)
  } catch (err: any) {
    error.value = err.message || String(err)
  } finally {
    loading.value = false
  }
}

onMounted(load)

async function onChangeStatus(newStatus: string) {
  if (!order.value) return
  const prev = order.value.status
  order.value.status = newStatus as any
  try {
    await updateOrderStatus(order.value.id, newStatus as any)
  } catch (err) {
    order.value.status = prev
    // show simple alert for now
    alert('Erreur lors de la mise à jour du statut')
  }
}
</script>
