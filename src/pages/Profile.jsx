import React, { useState } from 'react';
import { auth, updateProfile } from 'firebase/auth'; // Firebase authentication methods
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const Profile = () => {
  const { user } = useAuth(); // Get the user from context
  const [displayName, setDisplayName] = useState(user?.displayName || ''); // Initialize state with user info
  const [photoURL, setPhotoURL] = useState(user?.photoURL || ''); // Initialize photoURL with user info

  const handleSaveProfile = async () => {
    try {
      // Update the user's profile in Firebase Authentication
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      alert('Profile updated!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs p-4 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display Name"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          placeholder="Profile Picture URL"
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleSaveProfile}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
