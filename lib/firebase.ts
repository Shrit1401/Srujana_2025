import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNRaW6yEUbcUhk09HGP7m9Mj0AxazT7lc",
  authDomain: "vidyapak-b0d52.firebaseapp.com",
  projectId: "vidyapak-b0d52",
  storageBucket: "vidyapak-b0d52.firebasestorage.app",
  messagingSenderId: "678085503404",
  appId: "1:678085503404:web:0e938c605964b9445d7209",
  measurementId: "G-DKD535ZXST",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
