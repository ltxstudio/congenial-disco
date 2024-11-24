import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  updateEmail,
  deleteUser,
} from 'firebase/auth';
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  update,
  remove,
} from 'firebase/database';
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { getAnalytics, logEvent } from 'firebase/analytics';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOYe_BBLM6KPEqaObUfGQRax6Cp3_XNtc",
  authDomain: "livedevchat.firebaseapp.com",
  projectId: "livedevchat",
  storageBucket: "livedevchat.firebasestorage.app",
  messagingSenderId: "719459119717",
  appId: "1:719459119717:web:194609cbd4038007e6cc8c",
  measurementId: "G-DDGB9QY46F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// Google Auth provider
const googleProvider = new GoogleAuthProvider();

// Exporting Firebase services and utilities
export {
  app,
  auth,
  db,
  storage,
  storageRef,
  uploadBytesResumable,
  getDownloadURL,
  ref,
  set,
  push,
  onValue,
  update,
  remove,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  googleProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  updateEmail,
  deleteUser,
  logEvent,
  analytics,
};
