// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "simsoul-lk-demo.firebaseapp.com",
  projectId: "simsoul-lk-demo",
  storageBucket: "simsoul-lk-demo.appspot.com",
  messagingSenderId: "392419709722",
  appId: "1:392419709722:web:26e52af6fe0406f4f3d2a3",
  measurementId: "G-93HMZCPTQR",
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}