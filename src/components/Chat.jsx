import { useEffect, useState } from 'react';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

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
        createdAt: serverTimestamp(),
        user: 'User', // Replace with actual user data
        avatar: 'https://i.pravatar.cc/300' // Replace with user avatar URL
      });
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-4 bg-white rounded shadow">
        <div className="overflow-y-auto max-h-80 mb-4">
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              className="flex items-center mb-4"
              initial={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
            >
              <img src={msg.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
              <div>
                <p className="font-bold">{msg.user}</p>
                <p className="text-sm text-gray-600">{new Date(msg.createdAt?.seconds * 1000).toLocaleString()}</p>
                <p className="mt-1">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-2 border rounded-l"
          />
          <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded-r flex items-center justify-center">
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
