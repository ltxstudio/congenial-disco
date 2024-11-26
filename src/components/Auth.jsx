import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithGoogle } from '../firebase';
import { FcGoogle } from 'react-icons/fc';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-2 p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-2 p-2 border rounded"
        />
      </div>
      <button onClick={handleSignUp} className="mb-2 bg-blue-500 text-white p-2 rounded">Sign Up</button>
      <button onClick={handleSignIn} className="mb-2 bg-green-500 text-white p-2 rounded">Sign In</button>
      <button onClick={signInWithGoogle} className="flex items-center bg-red-500 text-white p-2 rounded">
        <FcGoogle className="mr-2" /> Sign in with Google
      </button>
    </div>
  );
};

export default Auth;
