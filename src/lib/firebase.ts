import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "swiftroute-uygrs",
  appId: "1:369745827855:web:e72cf54938daab85142b7a",
  storageBucket: "swiftroute-uygrs.firebasestorage.app",
  apiKey: "AIzaSyDOP1fu_JuPEl_2yDy8nbtd8QqYolzepFw",
  authDomain: "swiftroute-uygrs.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "369745827855"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
