<!-- src/components/BookList.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase/init'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy
} from 'firebase/firestore'

const loading = ref(true)
const books = ref([])
const error = ref(null)

onMounted(async () => {
  loading.value = true
  error.value = null
  books.value = []
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', 'asc')
    )
    const snap = await getDocs(q)
    books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) {
    error.value = e?.message || String(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <h2 class="h5">Books (isbn &gt; 1000)</h2>

  <div v-if="loading" class="text-muted">Loading…</div>
  <div v-else-if="error" class="text-danger">{{ error }}</div>
  <div v-else-if="!books.length" class="text-muted">No matching books yet.</div>

  <ul v-else class="list-group">
    <li v-for="b in books" :key="b.id" class="list-group-item d-flex justify-content-between">
      <span>
        <strong>{{ b.name }}</strong>
        <small class="text-muted"> (ISBN: {{ b.isbn }})</small>
      </span>
      <span class="text-muted small">{{ b.id }}</span>
    </li>
  </ul>
</template>
