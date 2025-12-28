import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();

  // 🔹 Wait until auth check finishes
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  // 🔹 Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
