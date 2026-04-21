import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

console.log("API KEY:", import.meta.env.VITE_FIREBASE_APIKEY);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginshoporia.firebaseapp.com",
  projectId: "loginshoporia",
  storageBucket: "loginshoporia.firebasestorage.app",
  messagingSenderId: "231238068522",
  appId: "1:231238068522:web:de9cecf1f0ffc8e8a25653",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
