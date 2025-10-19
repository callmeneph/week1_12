<!-- src/components/BookList.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase/init'
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

const books = ref([])
const loading = ref(true)
const error = ref(null)

// Edit state
const editId = ref(null)
const editName = ref('')
const editIsbn = ref('')

const load = async () => {
  loading.value = true
  error.value = null
  books.value = []

  try {
    const booksCol = collection(db, 'books')
    // Example query: isbn > 1000, ordered by isbn, limited to 50 (covers where, orderBy, limit)
    const q = query(
      booksCol,
      where('isbn', '>', 1000),
      orderBy('isbn', 'asc'),
      limit(50)
    )
    const snap = await getDocs(q)
    books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load books.'
  } finally {
    loading.value = false
  }
}

const startEdit = (b) => {
  editId.value = b.id
  editName.value = b.name
  editIsbn.value = b.isbn
}

const cancelEdit = () => {
  editId.value = null
  editName.value = ''
  editIsbn.value = ''
}

const saveEdit = async () => {
  if (!editId.value) return
  try {
    await updateDoc(doc(db, 'books', editId.value), {
      name: String(editName.value).trim(),
      isbn: Number(editIsbn.value),
    })
    await load()
    cancelEdit()
  } catch (e) {
    console.error(e)
    alert('Update failed.')
  }
}

const remove = async (id) => {
  if (!confirm('Delete this book?')) return
  try {
    await deleteDoc(doc(db, 'books', id))
    await load()
  } catch (e) {
    console.error(e)
    alert('Delete failed.')
  }
}

onMounted(load)
</script>

<template>
  <div class="mt-4">
    <div class="d-flex align-items-center mb-2">
      <h2 class="me-auto mb-0">Books (isbn &gt; 1000)</h2>
      <button class="btn btn-outline-secondary btn-sm" @click="load">Refresh</button>
    </div>

    <p v-if="loading">Loading...</p>
    <p v-if="error" class="text-danger">{{ error }}</p>

    <div v-if="!loading && books.length === 0" class="text-muted">
      No matching books found.
    </div>

    <div class="table-responsive" v-if="books.length">
      <table class="table align-middle">
        <thead>
          <tr>
            <th style="width:120px">ISBN</th>
            <th>Name</th>
            <th style="width:220px">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in books" :key="b.id">
            <template v-if="editId === b.id">
              <td><input v-model="editIsbn" type="number" class="form-control form-control-sm" /></td>
              <td><input v-model="editName" type="text" class="form-control form-control-sm" /></td>
              <td>
                <button class="btn btn-success btn-sm me-2" @click="saveEdit">Save</button>
                <button class="btn btn-outline-secondary btn-sm" @click="cancelEdit">Cancel</button>
              </td>
            </template>
            <template v-else>
              <td>{{ b.isbn }}</td>
              <td>{{ b.name }}</td>
              <td>
                <button class="btn btn-outline-primary btn-sm me-2" @click="startEdit(b)">
                  Edit
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="remove(b.id)">
                  Delete
                </button>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
