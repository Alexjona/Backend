// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8i_6yViQfLdY8XxE-sgbcqAIAIBwlD7Q",
  authDomain: "ecommerce-a45fb.firebaseapp.com",
  projectId: "ecommerce-a45fb",
  storageBucket: "ecommerce-a45fb.appspot.com",
  messagingSenderId: "842167001825",
  appId: "1:842167001825:web:133d30022ae42984814da0",
  measurementId: "G-77DDT0LNM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);