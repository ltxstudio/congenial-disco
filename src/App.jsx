import React from 'react';
import Auth from './components/Auth';
import Chat from './components/Chat';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Chat App</h1>
      <Auth />
      <Chat />
    </div>
  );
};

export default App;
