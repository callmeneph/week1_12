<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OWM_API_KEY
const city = ref('')
const weatherData = ref(null)
const errorMsg = ref('')

// Derived UI bits
const temperature = computed(() =>
  weatherData.value ? Math.round(weatherData.value.main.temp) : null
)
const iconUrl = computed(() =>
  weatherData.value ? `https://openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png` : null
)

// Core fetcher
async function fetchWeatherByUrl(url) {
  try {
    errorMsg.value = ''
    const { data } = await axios.get(url)
    weatherData.value = data
  } catch (err) {
    weatherData.value = null
    errorMsg.value = 'Failed to fetch weather.'
    console.error(err)
  }
}

// Current location on mount
onMounted(() => {
  if (!API_KEY) {
    errorMsg.value = 'Missing OpenWeather API key.'
    return
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const url =
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`
      await fetchWeatherByUrl(url)
    })
  }
})

// City search
async function searchByCity() {
  if (!city.value.trim()) return
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.value)}&appid=${API_KEY}&units=metric`
  await fetchWeatherByUrl(url)
}
</script>

<template>
  <section class="container py-4" style="max-width: 860px">
    <h1 class="mb-3">Weather</h1>

    <div class="d-flex gap-2 mb-3">
      <input
        class="form-control"
        placeholder="e.g. Clayton, AU"
        v-model="city"
        @keyup.enter="searchByCity"
      />
      <button class="btn btn-primary" @click="searchByCity">Search</button>
    </div>

    <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

    <main v-if="weatherData">
      <h2 class="h4">
        {{ weatherData.name }}, {{ weatherData.sys.country }}
      </h2>
      <div class="d-flex align-items-center gap-3 my-2">
        <img v-if="iconUrl" :src="iconUrl" alt="Weather icon" width="60" height="60" />
        <p class="display-6 my-0" v-if="temperature !== null">{{ temperature }} °C</p>
      </div>
      <span class="text-muted">
        {{ weatherData.weather[0].description }}
      </span>
    </main>
  </section>
</template>
