import React from 'react';

const ChatWindow = ({ messages, loading }) => {
  return (
    <div className="space-y-4">
      {/* Loading state */}
      {loading && (
        <div className="text-center text-gray-500">
          <p>Loading messages...</p>
        </div>
      )}

      {/* Display messages */}
      {!loading && messages.length === 0 && (
        <div className="text-center text-gray-500">
          <p>No messages yet. Start chatting!</p>
        </div>
      )}

      {messages.map((message, index) => (
        <div key={index} className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center">
              {/* User's avatar */}
              <span className="text-white">{message.sender.slice(0, 1)}</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-900 font-medium">{message.sender}</p>
            <p className="text-sm text-gray-700">{message.text}</p>
            <p className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
