import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3xmwr4z-j8k08q6tv285hIAbWo-OR_WI",
  authDomain: "healthtech-b81f8.firebaseapp.com",
  projectId: "healthtech-b81f8",
  storageBucket: "healthtech-b81f8.firebasestorage.app",
  messagingSenderId: "1090653964690",
  appId: "1:1090653964690:web:941be897f4b8c532bcd94b",
  measurementId: "G-R9JZDDP65K",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
