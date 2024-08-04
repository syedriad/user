// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9G3ZmO-itnofIDSROvVoY1p-0YtN76sc",
  authDomain: "user-dashboard-71025.firebaseapp.com",
  projectId: "user-dashboard-71025",
  storageBucket: "user-dashboard-71025.appspot.com",
  messagingSenderId: "691366497405",
  appId: "1:691366497405:web:c061c62ec1e6d6bc60b514"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };