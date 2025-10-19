<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'

const email = ref('')
const password = ref('')
const msg = ref('')

const submit = async () => {
  msg.value = ''
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    msg.value = 'Account created!'
  } catch (e) {
    msg.value = `Error: ${e.code || e.message || e}`
  }
}
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-5">
      <div class="card shadow-sm">
        <div class="card-body p-4">
          <h1 class="h4 mb-3">Register</h1>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input class="form-control" v-model="email" type="email" placeholder="you@example.com" />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input class="form-control" v-model="password" type="password" placeholder="Min 6 characters" />
          </div>

          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-primary" @click="submit">Register</button>
            <RouterLink :to="{ name: 'signin' }">Already registered? Sign in</RouterLink>
          </div>

          <p v-if="msg" class="mt-3" :class="{'text-danger': msg.startsWith('Error')}">{{ msg }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
