<!-- src/views/HomeView.vue -->
<script setup>
import { inject, computed } from 'vue'
const currentUserRef = inject('currentUserRef', null)
const email = computed(() => currentUserRef?.value?.email || null)
</script>

<template>
  <h1>Home</h1>
  <p v-if="email">Welcome back, <strong>{{ email }}</strong>.</p>
  <p v-else>Use the buttons in the header to sign in or register.</p>
</template>
