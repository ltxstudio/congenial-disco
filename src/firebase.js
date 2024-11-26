import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOYe_BBLM6KPEqaObUfGQRax6Cp3_XNtc",
  authDomain: "livedevchat.firebaseapp.com",
  databaseURL: "https://livedevchat-default-rtdb.firebaseio.com",
  projectId: "livedevchat",
  storageBucket: "livedevchat.firebasestorage.app",
  messagingSenderId: "719459119717",
  appId: "1:719459119717:web:194609cbd4038007e6cc8c",
  measurementId: "G-DDGB9QY46F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .catch((error) => console.error(error));
};

export { auth, db, signInWithGoogle };
