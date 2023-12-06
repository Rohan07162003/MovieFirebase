// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg149zAS3Q2i-Qi_Gm-XJufuOBI8T_2pU",
  authDomain: "fir-course-a22b0.firebaseapp.com",
  projectId: "fir-course-a22b0",
  storageBucket: "fir-course-a22b0.appspot.com",
  messagingSenderId: "501821534177",
  appId: "1:501821534177:web:cd4cf422d4d07561a06ca0",
  measurementId: "G-0KPWVM3MTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleprovider=new GoogleAuthProvider();
export const db =getFirestore(app);