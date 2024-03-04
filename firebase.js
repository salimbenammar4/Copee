import { initializeApp } from "firebase/app";
import { getAuth, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAeBOl6qzBCv5ylR-wmOBgxKv8_HrfrPjQ",
  authDomain: "copee-41efa.firebaseapp.com",
  projectId: "copee-41efa",
  databaseURL: "https://copee-41efa-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "copee-41efa.appspot.com",
  messagingSenderId: "206877008593",
  appId: "1:206877008593:web:5e06628af40e0cd5e2dbf0"
};


// Export Firebase app and auth

const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firestore, Authentication, and Storage
const db = getFirestore(firebaseApp);
const FIREBASE_AUTH = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const database = getDatabase(firebaseApp);

console.log(storage);

export { FIREBASE_AUTH, db, storage, database, EmailAuthProvider, reauthenticateWithCredential };