import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'

const app = createApp(App)

const currentUserRef = ref(null)
onAuthStateChanged(auth, u => { currentUserRef.value = u })
app.provide('currentUserRef', currentUserRef)

app.use(router).mount('#app')
