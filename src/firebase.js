import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';

// Firebase configuration (replace with your own Firebase config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore references
const messagesRef = collection(db, 'messages');

// Firestore functions
const sendMessage = async (text) => {
  try {
    await addDoc(messagesRef, {
      text,
      timestamp: new Date(),
    });
  } catch (e) {
    console.error("Error adding message: ", e);
  }
};

const getMessages = async () => {
  const q = query(messagesRef, orderBy("timestamp"), limit(10));
  const querySnapshot = await getDocs(q);
  const messages = [];
  querySnapshot.forEach((doc) => {
    messages.push(doc.data());
  });
  return messages;
};

export { sendMessage, getMessages };
