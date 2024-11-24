import React, { useState, useEffect } from 'react';
import { db, ref, push, onValue } from '../firebaseConfig';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { useAuth } from '../authContext';  // Assuming you implement user auth
import { FaPaperclip } from 'react-icons/fa';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { user } = useAuth(); // Get the logged-in user
  
  useEffect(() => {
    const messagesRef = ref(db, 'messages/');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesArray = data ? Object.values(data) : [];
      setMessages(messagesArray);
    });
  }, []);

  const sendMessage = () => {
    if (input.trim() !== '') {
      const messagesRef = ref(db, 'messages/');
      push(messagesRef, {
        text: input,
        sender: user.uid,
        timestamp: Date.now(),
      });
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <ChatWindow messages={messages} />
      <ChatInput
        input={input}
        setInput={setInput}
        onSendMessage={sendMessage}
      />
    </div>
  );
};

export default ChatApp;
