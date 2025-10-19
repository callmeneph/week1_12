<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const COUNT_URL = import.meta.env.VITE_COUNTBOOKS_URL
const payload = ref(null)
const errorMsg = ref('')

async function load() {
  try {
    errorMsg.value = ''
    const { data } = await axios.get(COUNT_URL)
    // Show the JSON body *as is* (for the Distinction/HD API task)
    payload.value = data
  } catch (err) {
    errorMsg.value = 'Failed to fetch count JSON.'
    console.error(err)
  }
}

onMounted(load)
</script>

<template>
  <section class="container py-4" style="max-width: 860px">
    <h1 class="mb-3">Count Book API (JSON)</h1>

    <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

    <pre v-if="payload" class="bg-light border rounded p-3">
{{ JSON.stringify(payload, null, 2) }}
    </pre>
  </section>
</template>
