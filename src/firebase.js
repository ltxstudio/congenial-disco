import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
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
  sendMessage,
  getMessages,
  uploadFile,
  deleteMessage,
};
