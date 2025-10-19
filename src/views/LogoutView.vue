<script setup>
import { onMounted } from 'vue'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(async () => { await signOut(auth); router.replace({ name: 'home' }) })
</script>

<template><p>Signing out…</p></template>
