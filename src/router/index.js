// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Import your views
import HomeView from '@/views/HomeView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPIView from '@/views/CountBookAPIView.vue'
import RegisterView from '@/views/RegisterView.vue'
import SignInView from '@/views/SignInView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'

// Define routes
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/weather', name: 'weather', component: WeatherView },
  { path: '/books/api', name: 'countbookapi', component: CountBookAPIView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/signin', name: 'signin', component: SignInView },
  { path: '/getbookcount', name: 'getbookcount', component: GetBookCountView },
]

// Create router (history mode ✅)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
