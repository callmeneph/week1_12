// src/lib/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// 🔑 Your Firebase web app config (from the Firebase Console SDK snippet)
const firebaseConfig = {
  apiKey: 'AIzaSyC7RRiI1kJTBfr5b0V94J5PKIUx2cY-Mcc',
  authDomain: 'fit5032-week6-mahdi.firebaseapp.com',
  projectId: 'fit5032-week6-mahdi',
  storageBucket: 'fit5032-week6-mahdi.firebasestorage.app',
  messagingSenderId: '7966960281',
  appId: '1:7966960281:web:44422d3a308a93c657a608'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
