// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8W5k1WUW09BW_wh5nBl536rNG3OoXtmY",
  authDomain: "logintest10-1bb5d.firebaseapp.com",
  projectId: "logintest10-1bb5d",
  storageBucket: "logintest10-1bb5d.appspot.com",
  messagingSenderId: "600273877888",
  appId: "1:600273877888:web:11326f79a7225bab34df65",
  measurementId: "G-0C738KVEV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);