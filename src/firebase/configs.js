import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCK0Ckbk8s5aD6KGcBo9tLYMZA6DrYaEMQ",
  authDomain: "fir-learn-34f4b.firebaseapp.com",
  projectId: "fir-learn-34f4b",
  storageBucket: "fir-learn-34f4b.appspot.com",
  messagingSenderId: "297728646620",
  appId: "1:297728646620:web:b2b62414d24d405ff48319",
  measurementId: "G-XTT685WL71",
};

initializeApp(firebaseConfig);
const DB = getFirestore();
const auth = getAuth();
export { DB, auth };
