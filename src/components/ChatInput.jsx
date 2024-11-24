import React, { useState } from 'react';
import { FaPaperclip, FaSmile } from 'react-icons/fa'; // Icons for attachments and smileys
import { storage, storageRef, uploadBytesResumable, getDownloadURL } from '../firebaseConfig';

const ChatInput = ({ input, setInput, onSendMessage }) => {
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isMessageEmpty, setIsMessageEmpty] = useState(false);

  // Handle message sending
  const handleSendMessage = () => {
    if (input.trim() !== '') {
      onSendMessage(input);
      setInput(''); // Clear input after sending message
      setIsMessageEmpty(false); // Reset empty state
    } else {
      setIsMessageEmpty(true); // If input is empty, display warning
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileRef = storageRef(storage, 'uploads/' + file.name);
      const uploadTask = uploadBytesResumable(fileRef, file);

      setIsFileUploading(true); // Start uploading state
      uploadTask.on(
        'state_changed',
        () => {}, // Progress listener (you can implement this if needed)
        (error) => {
          console.error('File upload failed', error);
          setIsFileUploading(false); // Set uploading state to false on error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            onSendMessage(downloadURL); // Send the file URL along with the message
            setIsFileUploading(false); // Set uploading state to false after successful upload
          });
        }
      );
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-300">
      <div className="flex items-center space-x-2">
        {/* File Upload Button */}
        <label htmlFor="file-upload" className="cursor-pointer text-gray-600 hover:text-blue-500 transition duration-150">
          <FaPaperclip size={20} />
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileUpload}
          disabled={isFileUploading} // Disable input while uploading
        />

        {/* Text Input Field */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {isMessageEmpty && (
          <span className="text-red-500 text-sm">Message cannot be empty!</span>
        )}

        {/* Send Button */}
        <button
          onClick={handleSendMessage}
          disabled={isFileUploading || !input.trim()} // Disable if uploading or no text
          className={`text-white p-2 rounded-lg hover:bg-blue-600 transition ${isFileUploading || !input.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'}`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
