<!-- src/views/FirebaseRegisterView.vue -->
<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMsg = ref('')

const register = async () => {
  errorMsg.value = ''
  try {
    await createUserWithEmailAndPassword(auth, email.value.trim(), password.value)
    router.push('/')  // go home after registration
  } catch (err) {
    errorMsg.value = err.code || err.message
  }
}
</script>

<template>
  <h1>Register</h1>

  <div style="max-width:520px">
    <label class="form-label">Email</label>
    <input class="form-control mb-3" type="email" v-model="email" />

    <label class="form-label">Password</label>
    <input class="form-control mb-3" type="password" v-model="password" />

    <small class="text-muted d-block mb-3">Min 6 characters (Firebase rule)</small>

    <div class="d-flex align-items-center gap-2">
      <button class="btn btn-primary" @click="register">Register</button>
      <RouterLink to="/signin">Already registered? Sign in</RouterLink>
    </div>

    <p v-if="errorMsg" class="text-danger mt-3">Error: {{ errorMsg }}</p>
  </div>
</template>

<style scoped>
.form-control { width: 100%; padding: .5rem .75rem; border:1px solid #ccc; border-radius: .375rem; }
.btn { padding:.5rem .75rem; border:1px solid transparent; border-radius:.375rem; background:#0d6efd; color:#fff; }
.text-danger { color:#dc3545; }
.text-muted { color:#6c757d; }
</style>
