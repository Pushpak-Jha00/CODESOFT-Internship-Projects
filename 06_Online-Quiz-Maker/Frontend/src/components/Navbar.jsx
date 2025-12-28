import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useAuthStore } from "../store/authStore.js";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    setDropdown(false);
    setOpen(false);
    toast.success("Logout successfully");
    navigate("/login");
  };

  return (
    <>
      {/* Main Navbar */}
     <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
  <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
    
    {/* Left: Logo */}
    <Link to="/" className="text-xl font-bold tracking-tight z-10">
      Quiz<span className="text-indigo-600">Maker</span>
    </Link>

    {/* Center: Transparent Message (ALWAYS VISIBLE) */}
    <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none">
      <p className="text-[11px] md:text-xs text-gray-400 tracking-wide">
        Website made by{" "}
        <span className="font-medium text-gray-500">
          Pushpak Jha
        </span>
      </p>
    </div>

    {/* Right: Desktop Menu */}
    <div className="hidden md:flex items-center gap-6 z-10">
      {!user ? (
        <>
          <Link
            to="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 rounded-lg text-sm font-medium
            bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
        </>
      ) : (
        <div className="relative">
          <button
            onClick={() => setDropdown(!dropdown)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg
            hover:bg-gray-100 transition"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white
            flex items-center justify-center text-sm font-semibold">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {user?.name || "User"}
            </span>
            <ChevronDown size={16} />
          </button>

          {dropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white
            border rounded-xl shadow-lg overflow-hidden">
              <Link
                to="/dashboard"
                onClick={() => setDropdown(false)}
                className="flex items-center gap-2 px-4 py-3
                text-sm hover:bg-gray-50"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3
                text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>

    {/* Mobile Toggle */}
    <button
      className="md:hidden z-10"
      onClick={() => setOpen(!open)}
    >
      {open ? <X size={22} /> : <Menu size={22} />}
    </button>
  </div>

  {/* Mobile Menu (unchanged) */}
  {open && (
    <div className="md:hidden bg-white border-t">
      <div className="px-4 py-4 flex flex-col gap-4">
        {!user ? (
          <>
            <Link to="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg bg-indigo-600
              text-white text-center"
            >
              Get Started
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  )}
</nav>

    </>
  );
}
