import React from 'react';

const ChatWindow = ({ messages }) => {
  return (
    <div className="flex-grow p-4 overflow-auto bg-gray-100">
      <div className="flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 max-w-xs rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
