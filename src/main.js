// src/main.js
import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

// ---- Styles (optional but recommended)
import 'bootstrap/dist/css/bootstrap.min.css'

// ---- PrimeVue (optional; remove if you don't use it)
import PrimeVue from 'primevue/config'
// If you installed @primeuix/themes:
import Aura from '@primeuix/themes/aura'
// If you installed @primevue/themes instead, use this import and
// delete the one above:
// import Aura from '@primevue/themes/aura'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

// ---- Firebase Auth
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'

// Create app
const app = createApp(App)

// Global state for the signed-in user
const currentUserRef = ref(null)
app.provide('currentUserRef', currentUserRef)

// PrimeVue setup (safe to remove if you don’t need it)
app.use(PrimeVue, { theme: { preset: Aura } })
app.component('DataTable', DataTable)
app.component('Column', Column)

// Simple auth guard: add meta: { requiresAuth: true } to protected routes
router.beforeEach((to, from, next) => {
  if (to.meta?.requiresAuth && !currentUserRef.value) {
    return next({ name: 'signin', query: { redirect: to.fullPath } })
  }
  next()
})

// Wait for the first auth state BEFORE mounting to avoid flicker
let appMounted = false
onAuthStateChanged(auth, (user) => {
  currentUserRef.value = user
  if (!appMounted) {
    app.use(router).mount('#app')
    appMounted = true
  }
})

/* -------------------------------
   If you want to use the Emulator:
   - In src/lib/firebase.js, call connectAuthEmulator(auth, 'http://localhost:9099')
   - Run: firebase emulators:start
   Use EITHER emulator OR live project, not both.
-------------------------------- */
