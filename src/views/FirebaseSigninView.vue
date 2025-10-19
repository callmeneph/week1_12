// SigninView.vue (script setup)
import { ref } from 'vue'
import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter, RouterLink } from 'vue-router'

const email = ref('')
const password = ref('')
const err = ref('')
const router = useRouter()

const signin = async () => {
  err.value = ''
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/')
  } catch (e) {
    err.value = e.message
  }
}
