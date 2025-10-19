<!-- src/views/AddBookView.vue -->
<script setup>
import { ref } from 'vue'
import { db } from '@/firebase/init'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import BookList from '@/components/BookList.vue'

const isbn = ref('')
const name = ref('')
const isSubmitting = ref(false)
const error = ref(null)
const success = ref(null)

const booksCol = collection(db, 'books')

const addBook = async () => {
  error.value = null
  success.value = null

  // Basic required checks (per brief)
  if (!isbn.value || !name.value) {
    error.value = 'Please fill both fields.'
    return
  }

  // Force ISBN to number (brief requires number, not string)
  const isbnNumber = Number(isbn.value)
  if (Number.isNaN(isbnNumber)) {
    error.value = 'ISBN must be a number.'
    return
  }

  try {
    isSubmitting.value = true
    await addDoc(booksCol, {
      isbn: isbnNumber,
      name: name.value.trim(),
      createdAt: serverTimestamp(),
    })
    success.value = 'Book added to Firestore.'
    isbn.value = ''
    name.value = ''
  } catch (e) {
    console.error(e)
    error.value = 'Failed to add book.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="container py-4">
    <h1 class="mb-3">Add Book</h1>

    <form @submit.prevent="addBook" class="row gy-3">
      <div class="col-12 col-md-4">
        <label class="form-label">ISBN (number)</label>
        <input v-model="isbn" type="number" class="form-control" required />
      </div>

      <div class="col-12 col-md-6">
        <label class="form-label">Name</label>
        <input v-model="name" type="text" class="form-control" required />
      </div>

      <div class="col-12">
        <button class="btn btn-primary" :disabled="isSubmitting">Add</button>
      </div>

      <div class="col-12">
        <p v-if="success" class="text-success">{{ success }}</p>
        <p v-if="error" class="text-danger">{{ error }}</p>
      </div>
    </form>

    <hr class="my-4" />

    <!-- 🔎 The query/list component (Step 4) -->
    <BookList />
  </div>
</template>
