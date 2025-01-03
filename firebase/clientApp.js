// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "event-master-7e74e.firebaseapp.com",
  projectId: "event-master-7e74e",
  storageBucket: "event-master-7e74e.firebasestorage.app",
  messagingSenderId: "939330034284",
  appId: "1:939330034284:web:32a8681889f8a595a0d649",
  measurementId: "G-ZN2E6BZCV4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };