import React, { useState, useEffect, useRef } from 'react';
import {
  signInWithGoogle,
  signOutUser,
  sendMessage,
  getMessages,
  uploadFile,
  onAuthStateChanged,
  deleteMessage,
} from './firebase';
import { FaPaperPlane, FaSmile, FaGoogle, FaTrash, FaEdit, FaUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Listen for auth changes
    onAuthStateChanged((user) => setUser(user));

    // Listen for real-time messages
    const unsubscribe = getMessages((fetchedMessages) => {
      setMessages(fetchedMessages);
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    return unsubscribe;
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() && !file) return;
    setLoading(true);

    if (file) {
      uploadFile(file, 'uploads', async (url) => {
        await sendMessage(input, user, url);
        setFile(null);
        setInput("");
        setLoading(false);
        toast.success("File sent!", { position: toast.POSITION.BOTTOM_RIGHT });
      });
    } else {
      await sendMessage(input, user);
      setInput("");
      setLoading(false);
      toast.success("Message sent!", { position: toast.POSITION.BOTTOM_RIGHT });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    toast.info("File ready to send!", { position: toast.POSITION.BOTTOM_RIGHT });
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Logged in successfully!", { position: toast.POSITION.BOTTOM_RIGHT });
    } catch (error) {
      toast.error("Login failed!", { position: toast.POSITION.BOTTOM_RIGHT });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast.info("You have logged out.", { position: toast.POSITION.BOTTOM_RIGHT });
    } catch (error) {
      toast.error("Logout failed!", { position: toast.POSITION.BOTTOM_RIGHT });
    }
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className={`p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-indigo-600 text-white'} flex justify-between items-center`}>
          <h2 className="text-xl font-semibold">React Chat App</h2>
          <button
            onClick={toggleDarkMode}
            className={`px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Authentication */}
        {!user ? (
          <div className="p-4 text-center">
            <button
              onClick={handleSignIn}
              className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all"
            >
              <FaGoogle className="mr-2" /> Sign In with Google
            </button>
          </div>
        ) : (
          <div className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-700">
            <div className="flex items-center">
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover mr-2"
              />
              <span className="text-lg font-semibold">{user.displayName}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-700 dark:text-gray-300 hover:text-red-500"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <span>Loading messages...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-3 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={msg.user.photoURL}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-semibold">{msg.user.name}</span>
                    </div>
                  </div>
                  {msg.imageUrl && (
                    <img
                      src={msg.imageUrl}
                      alt="Shared"
                      className="mt-2 rounded-lg max-w-xs"
                    />
                  )}
                  <p className="mt-1">{msg.text}</p>
                  <p className="mt-1 text-xs">{new Date(msg.timestamp.seconds * 1000).toLocaleTimeString()}</p>
                </motion.div>
              ))}
              <div ref={chatEndRef}></div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="flex items-center p-4 bg-gray-50 border-t">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border dark:border-gray-600"
          />
          <label>
            <FaUpload className="ml-3 cursor-pointer" />
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
          <button type="submit" className="ml-3 bg-indigo-600 p-3 rounded-full text-white hover:bg-indigo-700">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
