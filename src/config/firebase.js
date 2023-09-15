// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm1cfKXk0W2V9t1bKfgPmMPGhNN5oi2jE",
  authDomain: "todoapp-47bc6.firebaseapp.com",
  projectId: "todoapp-47bc6",
  storageBucket: "todoapp-47bc6.appspot.com",
  messagingSenderId: "771115127146",
  appId: "1:771115127146:web:0cf739d64c0a87b0425513",
  measurementId: "G-TKV11MMSXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider  = new GoogleAuthProvider(app);

export const db = getFirestore(app);