// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')
const SignInView = () => import('@/views/SignInView.vue')
const RegisterView = () => import('@/views/RegisterView.vue')
const LogoutView = () => import('@/views/LogoutView.vue')


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
  ],
})

export default router
