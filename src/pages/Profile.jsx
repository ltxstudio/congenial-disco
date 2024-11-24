import React, { useState, useEffect } from 'react';
import { auth, updateProfile } from '../firebaseConfig'; // Firebase authentication methods
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import { toast } from 'react-toastify'; // Notification library (optional)

const Profile = () => {
  const { user } = useAuth(); // Get the user from context
  const [displayName, setDisplayName] = useState(user?.displayName || ''); // Initialize state with user info
  const [photoURL, setPhotoURL] = useState(user?.photoURL || ''); // Initialize photoURL with user info
  const [loading, setLoading] = useState(false); // Loading state to show spinner
  const [error, setError] = useState(null); // Error state for displaying errors

  useEffect(() => {
    // Optional: Load user info on initial mount
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      // Update the user's profile in Firebase Authentication
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      toast.success('Profile updated successfully!'); // Show success message
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg space-y-6">
        <h2 className="text-3xl font-semibold text-center">Edit Profile</h2>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <div className="flex justify-center mb-4">
          <img
            src={photoURL || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-gray-300"
          />
        </div>

        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display Name"
          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          placeholder="Profile Picture URL"
          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSaveProfile}
          className="w-full p-3 bg-blue-600 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-6 h-6 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            'Save Profile'
          )}
        </button>

        <div className="text-center">
          <button
            onClick={() => console.log('Go back to home or log out functionality')} // Placeholder for back or logout action
            className="text-sm text-blue-500 hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
