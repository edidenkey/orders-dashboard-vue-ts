<template>
  <v-card>
    <v-card-title>Commande {{ order.reference }}</v-card-title>
    <v-card-text>
      <div><strong>Client:</strong> {{ order.customer.name }} ({{ order.customer.email }})</div>
      <div><strong>Total:</strong> {{ order.total }} €</div>
      <div class="mt-4">
        <v-select :items="statuses" v-model="localStatus" label="Modifier le statut" />
        <v-btn class="mt-2" @click="apply">Appliquer</v-btn>
      </div>

      <div class="mt-4">
        <h3>Produits</h3>
        <v-list>
          <v-list-item v-for="it in order.items" :key="it.productId">
            <v-list-item-content>
              <v-list-item-title>{{ it.name }} x{{ it.qty }}</v-list-item-title>
              <v-list-item-subtitle>{{ it.price }} €</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import type { Order, OrderStatus } from '../types/order'
import { updateOrderStatus } from '../api/orders'

const props = defineProps<{ order: Order }>()
const emit = defineEmits(['changeStatus'])

const order = props.order
const statuses: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
const localStatus = ref(order.status)

async function apply() {
  const prev = order.status
  order.status = localStatus.value
  emit('changeStatus', localStatus.value)
  try {
    await updateOrderStatus(order.id, localStatus.value)
  } catch (err) {
    order.status = prev
    alert('Erreur lors de la mise à jour')
  }
}
</script>
