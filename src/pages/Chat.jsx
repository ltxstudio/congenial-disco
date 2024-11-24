import React, { useState, useEffect } from 'react';
import { db, ref, push, onValue } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const messagesRef = ref(db, 'messages/');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesArray = data ? Object.values(data) : [];
      setMessages(messagesArray);
    });
  }, []);

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
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatWindow messages={messages} />
      <ChatInput input={input} setInput={setInput} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
