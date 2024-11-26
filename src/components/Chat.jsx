import { useEffect, useState } from 'react';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const handleSend = async () => {
    if (newMessage.trim() !== '') {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        createdAt: new Date()
      });
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-4 bg-white rounded shadow">
        <div className="overflow-y-auto max-h-80 mb-4">
          {messages.map(msg => (
            <motion.p
              key={msg.id}
              className="p-2 border-b"
              initial={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
            >
              {msg.text}
            </motion.p>
          ))}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="mb-2 p-2 border rounded w-full"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded w-full">Send</button>
      </div>
    </div>
  );
};

export default Chat;
