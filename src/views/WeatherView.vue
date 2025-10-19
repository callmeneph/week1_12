<!-- src/views/WeatherView.vue -->
<script setup>
import { ref } from 'vue'

const city = ref('')
const loading = ref(false)
const error = ref('')
const result = ref(null)

async function checkWeather() {
  error.value = ''
  result.value = null
  loading.value = true
  try {
    if (!city.value.trim()) throw new Error('Please enter a city name.')

    // 1) Geocode the city -> lat/lon (no API key needed)
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city.value
      )}&count=1&language=en&format=json`
    )
    const geo = await geoRes.json()
    if (!geo.results?.length) throw new Error('City not found.')
    const { latitude, longitude, name, country } = geo.results[0]

    // 2) Get current weather
    const wxRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    )
    const wx = await wxRes.json()
    if (!wx.current_weather) throw new Error('No weather data returned.')

    result.value = {
      place: `${name}${country ? ', ' + country : ''}`,
      ...wx.current_weather, // temperature, windspeed, winddirection, weathercode, time
    }
  } catch (e) {
    error.value = e?.message ?? 'Failed to fetch weather.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container py-4">
    <h1 class="mb-3">Weather</h1>

    <form class="row g-2 align-items-center mb-3" @submit.prevent="checkWeather">
      <div class="col-sm-6 col-md-4">
        <input
          v-model="city"
          type="text"
          class="form-control"
          placeholder="Enter city, e.g. Melbourne"
        />
      </div>
      <div class="col-auto">
        <button :disabled="loading" class="btn btn-primary">
          {{ loading ? 'Checking…' : 'Check weather' }}
        </button>
      </div>
    </form>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="result" class="card">
      <div class="card-body">
        <h5 class="card-title">{{ result.place }}</h5>
        <p class="mb-1">
          <strong>Temperature:</strong> {{ result.temperature }} °C
        </p>
        <p class="mb-1">
          <strong>Wind:</strong> {{ result.windspeed }} km/h (dir {{ result.winddirection }}°)
        </p>
        <p class="text-muted mb-0"><small>As of: {{ result.time }}</small></p>
      </div>
    </div>
  </div>
</template>
