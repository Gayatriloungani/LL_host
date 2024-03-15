// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA6s2r3xzdY5VFsbjJITzz_4vahKAYPqw",
  authDomain: "learnlocate-a3781.firebaseapp.com",
  projectId: "learnlocate-a3781",
  storageBucket: "learnlocate-a3781.appspot.com",
  messagingSenderId: "839320665763",
  appId: "1:839320665763:web:0fff9bee38bef774668916"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();