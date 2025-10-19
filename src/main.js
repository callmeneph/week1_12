// src/main.js
import { createApp, ref, h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import App from './App.vue'
import { auth } from './firebase'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap' // optional, only if you want dropdowns/modals etc.


// Views (we'll create them next)
import FirebaseSigninView from './views/FirebaseSigninView.vue'
import FirebaseRegisterView from './views/FirebaseRegisterView.vue'

const routes = [
  { path: '/', name: 'home', component: { template: '<div class="p-4">Home (Week 7)</div>' } },
  { path: '/signin', name: 'signin', component: FirebaseSigninView },
  { path: '/register', name: 'register', component: FirebaseRegisterView },
  {
    path: '/logout',
    name: 'logout',
    component: {
      template: '<div class="p-4">Logging out…</div>',
      mounted() {
        signOut(auth).finally(() => this.$router.replace('/signin'))
      },
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Provide a reactive currentUser everywhere
const app = createApp({
  setup() {
    const currentUser = ref(null)
    onAuthStateChanged(auth, (user) => {
      currentUser.value = user
      // REQUIRED in the studio: show current user in Console after sign-in
      console.log('[Auth] currentUser:', user)
    })
    // expose to App via inject (we'll provide below)
    return {}
  },
  render: () => h(App),
})

// provide/inject for header & pages
import { onAuthStateChanged as _oasc } from 'firebase/auth'
app.provide('auth', auth)
app.provide(
  'currentUserRef',
  (() => {
    const r = ref(null)
    _oasc(auth, (u) => (r.value = u))
    return r
  })()
)

app.use(router).mount('#app')
