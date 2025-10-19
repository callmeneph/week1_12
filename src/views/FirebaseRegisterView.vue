// RegisterView.vue (script setup)
import { ref } from 'vue'
import { auth } from '@/lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter, RouterLink } from 'vue-router'

const email = ref('')
const password = ref('')
const err = ref('')
const router = useRouter()

const register = async () => {
  err.value = ''
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    router.push('/')   // header should now show "Signed in as ..."
  } catch (e) {
    err.value = e.message
  }
}
