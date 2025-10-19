import { createRouter, createWebHistory } from 'vue-router'

// Lazy loaded views (make sure these files exist with these names)
const HomeView     = () => import('../views/HomeView.vue')
const SignInView   = () => import('../views/SignInView.vue')
const RegisterView = () => import('../views/RegisterView.vue')
const LogoutView   = () => import('../views/LogoutView.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',         name: 'home',     component: HomeView },
    { path: '/signin',   name: 'signin',   component: SignInView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/logout',   name: 'logout',   component: LogoutView },
  ],
})

export default router
