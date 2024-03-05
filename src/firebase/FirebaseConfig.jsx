import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPa8FmELWC29Yzwda2TaAGtIm9LRiNKV4",
  authDomain: "maharentagreement-79b07.firebaseapp.com",
  projectId: "maharentagreement-79b07",
  storageBucket: "maharentagreement-79b07.appspot.com",
  messagingSenderId: "941354758460",
  appId: "1:941354758460:web:eef2d3f8f0a23710f32e39"
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { storage, fireDB, auth };