// src/App.js

import React, { useState, useEffect } from 'react';
import { sendMessage, getMessages } from './firebase';
import { FaPaperPlane, FaSmile } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch messages when the component mounts
    const fetchMessages = async () => {
      setLoading(true);
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages);
      setLoading(false);
    };

    fetchMessages();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      await sendMessage(input);
      setInput("");
      toast.success("Message sent!", { position: toast.POSITION.BOTTOM_RIGHT });
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages);
    } else {
      toast.error("Please enter a message.", { position: toast.POSITION.BOTTOM_RIGHT });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="p-4 bg-indigo-600 text-white text-center">
            <h2 className="text-xl font-semibold">React Chat App</h2>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <span className="text-lg text-gray-600">Loading messages...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-200 p-3 rounded-lg shadow-sm"
                  >
                    <p className="text-gray-800">{msg.text}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex items-center p-4 bg-gray-50 border-t border-gray-200">
            <button type="button" className="mr-3 text-gray-600">
              <FaSmile size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="submit" className="ml-3 bg-indigo-600 p-3 rounded-full text-white hover:bg-indigo-700">
              <FaPaperPlane size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
