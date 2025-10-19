// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const HomeView           = () => import('../views/HomeView.vue')
const SignInView         = () => import('../views/SignInView.vue')
const RegisterView       = () => import('../views/RegisterView.vue')
const LogoutView         = () => import('../views/LogoutView.vue')
// If you added Firestore book page, keep or remove this line accordingly:
const AddBookView        = () => import('../views/AddBookView.vue')

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',         name: 'home',     component: HomeView },
    { path: '/signin',   name: 'signin',   component: SignInView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/logout',   name: 'logout',   component: LogoutView },
    { path: '/addbook',  name: 'addbook',  component: AddBookView }, // remove if file doesn't exist
  ],
})
