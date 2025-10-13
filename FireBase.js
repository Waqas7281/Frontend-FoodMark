// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "authentication-c0672.firebaseapp.com",
  projectId: "authentication-c0672",
  storageBucket: "authentication-c0672.firebasestorage.app",
  messagingSenderId: "1009259848367",
  appId: "1:1009259848367:web:52586d738065acd12c2a5a",
  measurementId: "G-VZGBSWZX25",
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app,auth}
