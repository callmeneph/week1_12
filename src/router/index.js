// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import LogoutView from '../views/LogoutView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/signin', name: 'signin', component: FirebaseSigninView },
  { path: '/register', name: 'register', component: FirebaseRegisterView },
  { path: '/logout', name: 'logout', component: LogoutView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
