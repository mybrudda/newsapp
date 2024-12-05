
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCilTuelyz1YWVxrqm-Wu0UsrboSQmXR90",
  authDomain: "newapp-4e90b.firebaseapp.com",
  projectId: "newapp-4e90b",
  storageBucket: "newapp-4e90b.firebasestorage.app",
  messagingSenderId: "926609924564",
  appId: "1:926609924564:web:c7d4c984ff250b6a89f641",
  measurementId: "G-G6V6Y3C1LY"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };


