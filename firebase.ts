import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC--FQzRZ7P35PH_VbngwbJB07sVQfNW5Y",
  authDomain: "good-girls-8bc19.firebaseapp.com",
  projectId: "good-girls-8bc19",
  storageBucket: "good-girls-8bc19.firebasestorage.app",
  messagingSenderId: "348518074924",
  appId: "1:348518074924:web:d5a16d2387782e5b545f89"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);