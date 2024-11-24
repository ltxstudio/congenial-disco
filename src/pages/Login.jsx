import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  // Google sign-in function
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google user info:', user);
      navigate('/');
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs p-4 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>

        <div className="text-center mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full p-2 border border-gray-300 rounded bg-white text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="mr-2">
              <path d="M12 4.352c1.473 0 2.721.49 3.684 1.307l2.49-2.26C16.403 1.054 14.347 0 12 0c-2.95 0-5.434 1.054-7.122 2.877l2.496 2.268C9.263 5.065 10.602 4.352 12 4.352zM12 19.648c-1.477 0-2.721-.49-3.684-1.307l-2.49 2.26C7.597 22.946 9.653 24 12 24c2.95 0 5.434-1.054 7.122-2.877l-2.496-2.268C14.737 18.935 13.398 19.648 12 19.648zM12 10.352c-1.077 0-2.098.347-2.91.928l-2.446-2.268C7.392 8.068 9.086 7 12 7c1.78 0 3.402.63 4.556 1.679l-2.49 2.268c-.812-.581-1.83-.928-2.907-.928zM12 13.648c1.078 0 2.098-.347 2.91-.928l2.446 2.268C16.608 15.932 14.914 17 12 17c-1.78 0-3.402-.63-4.556-1.679l2.49-2.268c.812.581 1.83.928 2.907.928z" />
            </svg>
            Sign in with Google
          </button>
        </div>

        <p className="mt-2 text-center text-sm">
          Don't have an account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
