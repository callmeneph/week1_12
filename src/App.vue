<!-- src/App.vue -->
<script setup>
import { inject, computed } from 'vue'
const currentUserRef = inject('currentUserRef', null)
const email = computed(() => currentUserRef?.value?.email || null)
</script>

<template>
  <header class="border-bottom py-2 px-3 d-flex align-items-center">
    <RouterLink class="me-3 text-decoration-none" to="/">Home</RouterLink>
    <div class="ms-auto d-flex align-items-center gap-2">
      <template v-if="email">
        <span class="text-muted small">Signed in as {{ email }}</span>
        <RouterLink class="btn btn-outline-secondary btn-sm" to="/logout">Logout</RouterLink>
      </template>
      <template v-else>
        <RouterLink class="btn btn-outline-primary btn-sm" to="/signin">Sign in</RouterLink>
        <RouterLink class="btn btn-primary btn-sm" to="/register">Register</RouterLink>
      </template>
    </div>
  </header>

  <RouterView />
</template>

<style>
body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
</style>
