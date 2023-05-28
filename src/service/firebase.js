// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword as create, signInWithEmailAndPassword as login, setPersistence, browserSessionPersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcLeuuBCpJ2nASucLGrqDVRKSTN05LpHI",
  authDomain: "plugo-ecommerce.firebaseapp.com",
  projectId: "plugo-ecommerce",
  storageBucket: "plugo-ecommerce.appspot.com",
  messagingSenderId: "404598519019",
  appId: "1:404598519019:web:c6d2bbedd17b625489faae",
  measurementId: "G-9DJM76397P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebaseAuth = getAuth(app);

setPersistence(firebaseAuth, browserSessionPersistence)
  .then(() => {
    // Authentication persistence set successfully
    // Continue with other Firebase operations or application logic
  })
  .catch((error) => {
    // An error occurred while setting the persistence
    console.log(error);
  });

export { create, login, firebaseAuth };
export const db = getFirestore(app);