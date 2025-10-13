"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { auth, googleProvider } from "../../lib/firebase";
import { signInWithPopup, onAuthStateChanged, signOut, User } from "firebase/auth";

export default function LoginButton() {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const login = async () => {
    try {
      setAuthError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login Failed:", err);
      const error = err as { code?: string; message?: string };
      if (error.code === 'auth/configuration-not-found') {
        setAuthError("Google sign-in is not configured. Please contact the site administrator.");
      } else {
        setAuthError("Login failed. Please try again.");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {authError && (
        <div className="mb-4 p-3 bg-red-800 text-red-200 rounded-md text-sm">
          {authError}
        </div>
      )}
      {user ? (
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt="Profile"
                width={24}
                height={24}
                className="w-6 h-6 rounded-full object-cover"
                referrerPolicy="no-referrer"
                unoptimized
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                {(user.displayName || user.email || 'U')[0].toUpperCase()}
              </div>
            )}
            <span className="text-sm text-gray-300">
              {user.displayName || user.email}
            </span>
          </div>
          <button onClick={logout} className="px-3 py-1 bg-red-600 text-white rounded-md text-sm cursor-pointer hover:bg-red-700 transition-colors">
            Sign Out
          </button>
        </div>
      ) : (
        <button 
          onClick={login} 
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-sm font-medium">Sign in with Google</span>
        </button>
      )}
    </div>
  );
}
