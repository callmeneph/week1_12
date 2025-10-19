// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

//Week-6 Firebase Web app config 
const firebaseConfig = {
  apiKey: 'AIzaSyC7RRi1IkJTBfr5b0V94J5PKIUX2cY-Mcc',
  authDomain: 'fit5032-week6-mahdi.firebaseapp.com',
  projectId: 'fit5032-week6-mahdi',
  storageBucket: 'fit5032-week6-mahdi.firebasestorage.app',
  messagingSenderId: '7966960281',
  appId: '1:7966960281:web:44422d3a308a93c657a608',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
