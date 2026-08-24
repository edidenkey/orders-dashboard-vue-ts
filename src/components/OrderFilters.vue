<template>
  <v-row class="align-center">
    <v-col cols="12" md="6">
      <v-text-field v-model="localSearch" label="Recherche" @input="onInput" clearable />
    </v-col>

    <v-col cols="12" md="3">
      <v-select
        :items="['pending','processing','shipped','delivered','cancelled']"
        v-model="localStatus"
        label="Statut"
        clearable
        @update:modelValue="onStatusChange"
      />
    </v-col>

    <v-col cols="12" md="3" class="d-flex align-center">
      <v-btn text @click="resetFilters">Réinitialiser</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits, defineProps } from 'vue'

const props = defineProps({
  search: String,
  status: String
})
const emit = defineEmits(['update:search', 'update:status', 'resetPage'])

const localSearch = ref(props.search ?? '')
const localStatus = ref(props.status ?? null)

watch(() => props.search, v => (localSearch.value = v ?? ''))
watch(() => props.status, v => (localStatus.value = v ?? null))

function onInput() {
  emit('update:search', localSearch.value)
  emit('resetPage')
}

function onStatusChange() {
  emit('update:status', localStatus.value)
  emit('resetPage')
}

function resetFilters() {
  localSearch.value = ''
  localStatus.value = null
  emit('update:search', '')
  emit('update:status', null)
  emit('resetPage')
}
</script>
