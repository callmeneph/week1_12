// src/main.js
import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'

// Optional global CSS
import './assets/main.css'

const app = createApp(App)

// Reactive current user
const currentUserRef = ref(null)
onAuthStateChanged(auth, (user) => {
  currentUserRef.value = user
})

// Make it available to all components
app.provide('currentUserRef', currentUserRef)

app.use(router).mount('#app')
