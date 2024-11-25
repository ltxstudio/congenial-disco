import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged as firebaseOnAuthStateChanged, // Correct import
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA26tNU5O9bLUXyn4-yGbi0uelgPlfFbn0",
  authDomain: "legal-generator-tool.firebaseapp.com",
  projectId: "legal-generator-tool",
  storageBucket: "legal-generator-tool.firebasestorage.app",
  messagingSenderId: "120806328522",
  appId: "1:120806328522:web:26371327b2ad57a3e8cc33",
  measurementId: "G-9Y9MSZ93TD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Firestore references
const messagesRef = collection(db, "messages");

// Authentication
const provider = new GoogleAuthProvider();
const signInWithGoogle = () => signInWithPopup(auth, provider);
const signOutUser = () => signOut(auth);
const onAuthStateChanged = (callback) => firebaseOnAuthStateChanged(auth, callback); // Correctly export onAuthStateChanged

// Send a text message
const sendMessage = async (text, user, imageUrl = null, fileUrl = null) => {
  await addDoc(messagesRef, {
    text,
    timestamp: serverTimestamp(),
    user: {
      name: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
    },
    imageUrl,
    fileUrl,
  });
};

// Get messages in real-time
const getMessages = (callback) => {
  const q = query(messagesRef, orderBy("timestamp"));
  return onSnapshot(q, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    callback(messages);
  });
};

// Upload image or file to Firebase Storage
const uploadFile = (file, path, callback) => {
  const storageRef = ref(storage, `${path}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    null,
    (error) => console.error("Upload failed:", error),
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      callback(downloadURL);
    }
  );
};

// Delete a message
const deleteMessage = async (messageId) => {
  const messageDoc = doc(db, "messages", messageId);
  await deleteDoc(messageDoc);
};

export {
  auth,
  signInWithGoogle,
  signOutUser,
  onAuthStateChanged,
  sendMessage,
  getMessages,
  uploadFile,
  deleteMessage,
};
