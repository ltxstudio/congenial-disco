import React, { useState, useEffect } from 'react';
import { db, ref, push, onValue } from '../firebaseConfig'; // Firebase services
import { useAuth } from '../context/AuthContext'; // Authentication context
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';

const Chat = () => {
  const { user } = useAuth(); // Get user data from context
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (user) {
      const messagesRef = ref(db, 'messages/');
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const messagesArray = data ? Object.values(data) : [];
        setMessages(messagesArray);
        setLoading(false); // Set loading to false once data is fetched
      });
    }
  }, [user]);

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      push(ref(db, 'messages/'), {
        sender: user.uid,
        text: input,
        timestamp: Date.now(),
      });
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-4">
        <ChatWindow messages={messages} loading={loading} />
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-white border-t border-gray-300">
        <ChatInput
          input={input}
          setInput={setInput}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
