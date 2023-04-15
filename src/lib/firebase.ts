import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOuNTxpgoBkATWK_4g5OS24_GgK_0v80Q",
  authDomain: "mypass-ebdd8.firebaseapp.com",
  projectId: "mypass-ebdd8",
  storageBucket: "mypass-ebdd8.appspot.com",
  messagingSenderId: "489112662969",
  appId: "1:489112662969:web:f8c3e8d9d1ccba1d8cbc68",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
