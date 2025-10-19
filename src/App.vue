<!-- src/App.vue -->
<script setup>
import { inject, computed } from 'vue'
const currentUserRef = inject('currentUserRef', null)
const email = computed(() => currentUserRef?.value?.email || null)
</script>

<template>
  <header class="border-bottom py-2 px-3 d-flex align-items-center gap-3">
    <RouterLink class="text-decoration-none" to="/">Home</RouterLink>

    <template v-if="email">
      <RouterLink class="text-decoration-none" to="/addbook">Add Book</RouterLink>
      <span class="ms-auto text-muted small">Signed in as {{ email }}</span>
      <RouterLink class="btn btn-outline-secondary btn-sm" to="/logout">Logout</RouterLink>
    </template>

    <template v-else>
      <span class="ms-auto"></span>
      <RouterLink class="btn btn-outline-primary btn-sm me-2" to="/signin">Sign in</RouterLink>
      <RouterLink class="btn btn-primary btn-sm" to="/register">Register</RouterLink>
    </template>
  </header>

  <main class="container py-4">
    <RouterView />
  </main>
</template>

<style>
body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
</style>
