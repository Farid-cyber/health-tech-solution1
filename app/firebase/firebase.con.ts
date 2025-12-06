// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3xmwr4z-j8k08q6tv285hIAbWo-OR_WI",
  authDomain: "healthtech-b81f8.firebaseapp.com",
  projectId: "healthtech-b81f8",
  storageBucket: "healthtech-b81f8.firebasestorage.app",
  messagingSenderId: "1090653964690",
  appId: "1:1090653964690:web:941be897f4b8c532bcd94b",
  measurementId: "G-R9JZDDP65K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);
export const db = getFirestore(app);

