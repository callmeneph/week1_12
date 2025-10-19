// src/main.js
import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/init' // ⬅️ moved here

import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

const currentUserRef = ref(null)
onAuthStateChanged(auth, user => { currentUserRef.value = user })

app.provide('currentUserRef', currentUserRef)
app.use(router).mount('#app')
