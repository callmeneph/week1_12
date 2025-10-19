// src/lib/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth /*, connectAuthEmulator */ } from 'firebase/auth'

const firebaseConfig = {
  apiKey: '...your key...',
  authDomain: 'fit5032-week6-mahdi.firebaseapp.com',
  projectId: 'fit5032-week6-mahdi',
  storageBucket: 'fit5032-week6-mahdi.appspot.com',
  messagingSenderId: '7966960281',
  appId: '1:7966960281:web:...'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

// If you want to use the Emulator instead of the real project:
// connectAuthEmulator(auth, 'http://localhost:9099')
