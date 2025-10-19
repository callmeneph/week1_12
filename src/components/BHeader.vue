<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
    <router-link to="/" class="navbar-brand fw-bold">📚 My Library</router-link>
    <RouterLink class="nav-link" to="/weather">Get Weather</RouterLink>
    <RouterLink class="nav-link" to="/books/api">CountBook API</RouterLink>

    <div class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home (Week 4)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contact" class="nav-link" active-class="active">Contact us</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar { box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); }
.nav-link.active { font-weight: bold; color: #275fda !important; }
</style>
