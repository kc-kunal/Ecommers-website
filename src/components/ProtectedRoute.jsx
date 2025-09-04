import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isSignedIn } = useUser();  // ✅ sahi check

  if (!isSignedIn) {
    return <Navigate to="/" />; // agar login nahi hai to redirect
  }

  return children; // agar login hai to show kar
}

export default ProtectedRoute;
