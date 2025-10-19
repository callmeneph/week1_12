<script setup>
import { inject, computed } from 'vue'
const currentUserRef = inject('currentUserRef', null)
const email = computed(() => currentUserRef?.value?.email || null)
</script>

<template>
  <nav class="navbar navbar-light bg-light border-bottom">
    <div class="container">
      <RouterLink class="navbar-brand" :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink class="me-3 text-decoration-none" to="/firestore">Firestore</RouterLink>


      <div class="ms-auto d-flex align-items-center gap-2">
        <template v-if="email">
          <span class="text-muted small">Signed in as {{ email }}</span>
          <RouterLink class="btn btn-outline-secondary btn-sm" :to="{ name: 'logout' }">
            Logout
          </RouterLink>
        </template>
        <template v-else>
          <RouterLink class="btn btn-outline-primary btn-sm" :to="{ name: 'signin' }">Sign in</RouterLink>
          <RouterLink class="btn btn-primary btn-sm" :to="{ name: 'register' }">Register</RouterLink>
        </template>
      </div>
    </div>
  </nav>

  <main class="container py-4">
    <RouterView />
  </main>
</template>
