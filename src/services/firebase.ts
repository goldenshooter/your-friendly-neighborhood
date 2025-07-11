// src/services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDL9LRk4Avvlrr86E7xpBr2-teiCyv_p0E",
  authDomain: "your-friendly-neighborhood.firebaseapp.com",
  projectId: "your-friendly-neighborhood",
  storageBucket: "your-friendly-neighborhood.firebasestorage.app",
  messagingSenderId: "326924655876",
  appId: "1:326924655876:web:0de377703c6c82bfe8c451"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// Sign in anonymously on app start
signInAnonymously(auth).catch((err) => {
  console.error('Anonymous sign-in error:', err);
});