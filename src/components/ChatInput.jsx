import React, { useState } from 'react';
import { FaPaperclip, FaSmile } from 'react-icons/fa';
import { storage, storageRef, uploadBytesResumable, getDownloadURL } from '../firebaseConfig';

const ChatInput = ({ input, setInput, onSendMessage }) => {
  const [isFileUploading, setIsFileUploading] = useState(false);

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      onSendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileRef = storageRef(storage, 'uploads/' + file.name);
      const uploadTask = uploadBytesResumable(fileRef, file);

      setIsFileUploading(true);
      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          console.error('File upload failed', error);
          setIsFileUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            onSendMessage(downloadURL);
            setIsFileUploading(false);
          });
        }
      );
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-300">
      <div className="flex items-center space-x-2">
        <label htmlFor="file-upload" className="cursor-pointer text-gray-600">
          <FaPaperclip size={20} />
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileUpload}
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="text-blue-500 bg-transparent p-2 rounded-lg hover:bg-blue-100 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
