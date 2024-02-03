import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtZHaOON52kuchi8ZZaIC7zhPP7FjIqWQ",
  authDomain: "chat-app-81b81.firebaseapp.com",
  projectId: "chat-app-81b81",
  storageBucket: "chat-app-81b81.appspot.com",
  messagingSenderId: "1056794185676",
  appId: "1:1056794185676:web:9f4528e3532182b0fd9769",
  measurementId: "G-HB79F6ZEK0",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };
