// src/main.js
import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

// Bootstrap (optional, if you used it before)
import 'bootstrap/dist/css/bootstrap.min.css'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/init'

const app = createApp(App)

// track auth user in a reactive ref and provide to all components
const currentUserRef = ref(null)
onAuthStateChanged(auth, user => { currentUserRef.value = user })

app.provide('currentUserRef', currentUserRef)

app.use(router).mount('#app')
