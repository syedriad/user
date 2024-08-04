import React, { useState } from 'react';
import { loginWithGoogle } from '../auth/auth';
import {auth} from "../auth/firebaseConfig"

const Login = ({ onLoginSuccess }) => {
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      onLoginSuccess(auth.currentUser);
      alert("LOGIN SUCCESS")
    } catch (error) {
      alert("Failed to log in with Google.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
