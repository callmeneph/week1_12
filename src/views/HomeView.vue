<template>
  <h1>Home</h1>
  <p>If navigation works, clicking the buttons in the header (or below) should change route.</p>

  <div class="mt-3 d-flex gap-2">
    <RouterLink class="btn btn-outline-primary btn-sm" :to="{ name: 'signin' }">Go Sign in</RouterLink>
    <RouterLink class="btn btn-primary btn-sm" :to="{ name: 'register' }">Go Register</RouterLink>
  </div>
</template>
