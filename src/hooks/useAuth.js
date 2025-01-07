// src/hooks/useAuth.js
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/**
 * useAuth
 *
 * A custom hook to handle user authentication logic.
 *
 * Returns:
 *   - userInfo: The currently logged-in user object from Redux (or null).
 *   - isAuthenticated: Boolean indicating if the user is logged in.
 *   - isAdmin: Boolean indicating if the user role is 'ADMIN' (optional).
 *
 * You can also handle automatic redirects here if needed.
 */

export default function useAuth({
  requireAdmin = false,
  redirectTo = "/login",
} = {}) {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const isAuthenticated = !!userInfo; // True if userInfo is not null/undefined
  const isAdmin = isAuthenticated && userInfo.role === "ADMIN";

  useEffect(() => {
    // If authentication is required and user is not logged in, redirect
    if (!isAuthenticated) {
      navigate(redirectTo);
      return;
    }
    // If admin is required and user is not admin, redirect (or handle accordingly)
    if (requireAdmin && !isAdmin) {
      navigate("/"); // or some 'Not Authorized' page
    }
  }, [isAuthenticated, isAdmin, navigate, requireAdmin, redirectTo]);

  return { userInfo, isAuthenticated, isAdmin };
}
