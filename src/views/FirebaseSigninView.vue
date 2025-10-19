<!-- src/views/FirebaseSigninView.vue -->
<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

// To show "current user" on the page if you like
const currentUserRef = inject('currentUserRef', null)

const signIn = async () => {
  errorMsg.value = ''
  loading.value = true
  try {
    const cred = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log('[SignIn] success:', cred.user) // visible in DevTools Console
    router.push('/')
  } catch (e) {
    console.error(e)
    errorMsg.value = e.message || 'Sign in failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container py-4" style="max-width: 680px">
    <h2 class="mb-3">Sign In</h2>

    <form @submit.prevent="signIn" novalidate>
      <div class="mb-3">
        <label class="form-label" for="email">Email</label>
        <input id="email" type="email" class="form-control" v-model="email" required />
      </div>

      <div class="mb-3">
        <label class="form-label" for="pass">Password</label>
        <input id="pass" type="password" class="form-control" v-model="password" required />
      </div>

      <div v-if="errorMsg" class="alert alert-danger py-2">{{ errorMsg }}</div>

      <button class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Signing in…' : 'Sign In' }}
      </button>
      <router-link to="/register" class="btn btn-link">Create an account</router-link>

      <div class="mt-3 small text-muted">
        Current user:
        <code>{{ currentUserRef?.value?.email || '— not signed in —' }}</code>
      </div>
    </form>
  </div>
</template>
