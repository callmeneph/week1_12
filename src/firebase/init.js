// src/firebase/init.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// 🔧 Use the SAME config you used in Week 6/7.
// This is the one you showed in your screenshot:
const firebaseConfig = {
  apiKey: 'AIzaSyC7RRi1IkJTBfr5b0V94J5PKIUX2cY-Mcc',
  authDomain: 'fit5032-week6-mahdi.firebaseapp.com',
  projectId: 'fit5032-week6-mahdi',
  storageBucket: 'fit5032-week6-mahdi.appspot.com',
  messagingSenderId: '7966960281',
  appId: '1:7966960281:web:44422d3a308a93c657a608'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
