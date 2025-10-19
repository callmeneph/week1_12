<!-- src/views/LogoutView.vue -->
<script setup>
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
onMounted(async () => {
  await signOut(auth)
  router.replace('/')
})
</script>

<template>
  <p>Signing you out…</p>
</template>
