<!-- src/views/FirebaseRegisterView.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const register = async () => {
  errorMsg.value = ''
  loading.value = true
  try {
    const cred = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log('[Register] success:', cred.user)
    router.push('/signin')
  } catch (e) {
    console.error(e)
    errorMsg.value = e.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container py-4" style="max-width: 680px">
    <h2 class="mb-3">Register</h2>

    <form @submit.prevent="register" novalidate>
      <div class="mb-3">
        <label class="form-label" for="regEmail">Email</label>
        <input id="regEmail" type="email" class="form-control" v-model="email" required />
      </div>

      <div class="mb-3">
        <label class="form-label" for="regPass">Password</label>
        <input id="regPass" type="password" class="form-control" v-model="password" required />
        <div class="form-text">Min 6 characters (Firebase rule)</div>
      </div>

      <div v-if="errorMsg" class="alert alert-danger py-2">{{ errorMsg }}</div>

      <button class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Registering…' : 'Register' }}
      </button>
      <router-link to="/signin" class="btn btn-link">Already registered? Sign in</router-link>
    </form>
  </div>
</template>
