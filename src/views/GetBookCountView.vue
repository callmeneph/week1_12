<script setup>
import { ref } from 'vue'
import axios from 'axios'

// ✅ Replace this after you deploy the function (step 2C).
// For now you can leave it as an empty string to avoid accidental calls.
const FUNCTION_URL = "https://australia-southeast1-fit5032-week6-mahdi.cloudfunctions.net/countBooks"  // e.g. "https://REGION-PROJECT.cloudfunctions.net/countBooks"

const loading = ref(false)
const count = ref(null)
const error = ref(null)

const getCount = async () => {
  loading.value = true
  count.value = null
  error.value = null

  try {
    const { data } = await axios.get(FUNCTION_URL)
    // Expect { count: number }, but also accept primitive number
    count.value = typeof data === 'object' && data !== null ? data.count : data
  } catch (e) {
    error.value = e?.response?.data?.error || e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container py-4">
    <h1 class="mb-3">Book Counter</h1>

    <button class="btn btn-primary mb-3" @click="getCount" :disabled="loading || !FUNCTION_URL">
      {{ loading ? 'Loading…' : 'Get Book Count' }}
    </button>
    <p v-if="!FUNCTION_URL" class="text-warning">
      Paste your deployed Cloud Function URL into <code>FUNCTION_URL</code> (see step 2C), then click the button.
    </p>

    <div v-if="count !== null" class="alert alert-success">
      Total number of books: <strong>{{ count }}</strong>
    </div>
    <div v-else-if="error" class="alert alert-danger">
      Error: {{ error }}
    </div>
  </div>
</template>
