import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Ensure this is correct
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Chat from './pages/Chat';

const App = () => {
  return (
    // Wrap the Routes inside the AuthProvider for user context
    <AuthProvider>
      <Routes>
        {/* Ensure the routes match the component names and paths */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
