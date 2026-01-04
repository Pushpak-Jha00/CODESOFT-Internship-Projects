import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout, token } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-black text-white px-6 py-4 flex justify-between items-center"
    >
      <Link to="/" className="font-bold text-xl">
        JobBoard
      </Link>

      <div className="space-x-4 flex items-center">
        {!token ? (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        ) : (
          <>
            {user?.role === "candidate" && (
              <>
                <Link to="/jobs" className="hover:underline">
                  Jobs
                </Link>
                <Link to="/candidate" className="hover:underline">
                  Dashboard
                </Link>
              </>
            )}

            {user?.role === "employer" && (
              <Link to="/employer" className="hover:underline">
                Employer Dashboard
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </motion.nav>
  );
}
