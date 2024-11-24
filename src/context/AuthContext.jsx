import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebaseConfig'; // Firebase authentication config
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

// AuthProvider component provides the user state to the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the current user
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Ensure the useAuth hook is exported for use in other components
export const useAuth = () => {
  return useContext(AuthContext); // Use the context for accessing the user state
};
