import React from 'react';
import Chat from './components/Chat';

const App = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">My Beautiful Chat App</h1>
      <Chat />
    </div>
  );
};

export default App;
