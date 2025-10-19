// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')
const SignInView = () => import('@/views/SignInView.vue')
const RegisterView = () => import('@/views/RegisterView.vue')
const LogoutView = () => import('@/views/LogoutView.vue')
const WeatherView = () => import('@/views/WeatherView.vue')
const CountBookAPIView = () => import('@/views/CountBookAPIView.vue')

const AddBookView = () => import('@/views/AddBookView.vue')
const GetBookCountView = () => import('@/views/GetBookCountView.vue') 

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/signin', component: SignInView },
    { path: '/register', component: RegisterView },
    { path: '/logout', component: LogoutView },
    { path: '/addbook', component: AddBookView },
    { path: '/books/count', name: 'GetBookCount', component: GetBookCountView,},
    { path: '/weather', name: 'GetWeather', component: WeatherView }, // Week 10 weather page
    { path: '/books/api', name: 'CountBookAPI', component: CountBookAPIView }, // Week 10 API JSON page
  ],
})

export default router
