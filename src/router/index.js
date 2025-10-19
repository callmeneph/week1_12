const FirestoreDemoView = () => import('../views/FirestoreDemoView.vue')

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/signin', name: 'signin', component: SignInView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/logout', name: 'logout', component: LogoutView },
    { path: '/firestore', name: 'firestore', component: FirestoreDemoView }, // 👈 New
  ]
})
