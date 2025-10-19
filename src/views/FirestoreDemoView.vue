<script setup>
import { ref, onMounted } from 'vue'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'

const books = ref([])
const newBook = ref('')

// Load existing data
const loadBooks = async () => {
  books.value = []
  const snapshot = await getDocs(collection(db, 'books'))
  snapshot.forEach(doc => books.value.push({ id: doc.id, ...doc.data() }))
}

// Add new data
const addBook = async () => {
  if (!newBook.value.trim()) return
  await addDoc(collection(db, 'books'), { title: newBook.value })
  newBook.value = ''
  await loadBooks()
}

onMounted(loadBooks)
</script>

<template>
  <div class="container mt-4">
    <h1 class="mb-3">📚 Firestore Demo</h1>

    <div class="input-group mb-3">
      <input v-model="newBook" class="form-control" placeholder="Enter book title..." />
      <button class="btn btn-primary" @click="addBook">Add Book</button>
    </div>

    <ul class="list-group">
      <li v-for="book in books" :key="book.id" class="list-group-item">
        {{ book.title }}
      </li>
    </ul>
  </div>
</template>
