<template>
  <v-container class="pa-6">
    <v-row>
      <v-col cols="12">
        <h1>Gestion des commandes</h1>
      </v-col>

      <v-col cols="12">
        <OrderFilters v-model:search="search" v-model:status="status" @resetPage="onResetPage" />
      </v-col>

      <v-col cols="12">
        <OrderList
          :search="search"
          :status="status"
          :page="page"
          :limit="limit"
          @update:page="page = $event"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import OrderFilters from '../components/OrderFilters.vue'
import OrderList from '../components/OrderList.vue'

const search = ref('')
const status = ref<string | null>(null)
const page = ref(1)
const limit = 10

function onResetPage() {
  page.value = 1
}
</script>
