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

// Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID',
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
