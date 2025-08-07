// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkWKeOL8jhs_V49s-BZxqOSfoiDGu9Lw4",
  authDomain: "study-zone-5e75a.firebaseapp.com",
  projectId: "study-zone-5e75a",
  storageBucket: "study-zone-5e75a.firebasestorage.app",
  messagingSenderId: "244234626417",
  appId: "1:244234626417:web:8be7eebde3edaa0ca982d0",
  measurementId: "G-JRDW56PQ9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);