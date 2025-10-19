<!-- src/views/AddBookView.vue -->
<script setup>
import { ref } from 'vue'
import { db } from '@/firebase/init'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import BookList from '@/components/BookList.vue'

const name = ref('')
const isbnStr = ref('') // keep as string in the input; convert to number on save
const saving = ref(false)
const message = ref(null)
const error = ref(null)

const submit = async () => {
  message.value = null
  error.value = null

  const isbn = Number(isbnStr.value)
  if (!name.value.trim() || !isbn || Number.isNaN(isbn)) {
    error.value = 'Please enter a name and a numeric ISBN.'
    return
  }

  saving.value = true
  try {
    await addDoc(collection(db, 'books'), {
      name: name.value.trim(),
      isbn,
      createdAt: serverTimestamp()
    })
    message.value = 'Book added!'
    name.value = ''
    isbnStr.value = ''
  } catch (e) {
    error.value = e?.message || String(e)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <h1 class="h3 mb-4">Add Book</h1>

  <form class="row gy-3" @submit.prevent="submit" novalidate>
    <div class="col-12 col-md-6">
      <label class="form-label">Book name <span class="text-danger">*</span></label>
      <input v-model="name" type="text" required class="form-control" placeholder="e.g. Clean Code" />
    </div>

    <div class="col-12 col-md-6">
      <label class="form-label">ISBN <span class="text-danger">*</span></label>
      <input v-model="isbnStr" type="number" min="1" step="1" required class="form-control" placeholder="e.g. 9780132350884" />
    </div>

    <div class="col-12">
      <button :disabled="saving" class="btn btn-primary">Add</button>
    </div>

    <p v-if="message" class="text-success mb-0">{{ message }}</p>
    <p v-if="error" class="text-danger mb-0">{{ error }}</p>
  </form>

  <hr class="my-4" />

  <!-- 8.5 Query example -->
  <BookList />
</template>
