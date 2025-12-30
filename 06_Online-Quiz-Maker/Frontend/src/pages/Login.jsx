import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore.js";
import PageWrapper from "../components/PageWrapper.jsx";


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // 🔐 lock state
  const [lockSeconds, setLockSeconds] = useState(null);

  const navigate = useNavigate();
  const { checkAuth } = useAuthStore();

  // ⏱ countdown effect
  useEffect(() => {
    if (lockSeconds === null) return;

    if (lockSeconds <= 0) {
      setLockSeconds(null);
      return;
    }

    const timer = setInterval(() => {
      setLockSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [lockSeconds]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // stop if locked
    if (lockSeconds !== null) return;

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/login", form);
      await checkAuth();

      toast.success("Welcome back 👋");
      navigate("/");
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message;

      // 🔐 Account locked
      if (status === 423 && message) {
        // extract minutes from message
        const match = message.match(/(\d+)/);
        const minutes = match ? parseInt(match[1]) : 15;

        setLockSeconds(minutes * 60);
      } else if (status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error(message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // format mm:ss
  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <PageWrapper>
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold mb-1">Welcome Back</h2>
          <p className="text-gray-500 text-sm">
            Login to continue to QuizMaker
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
              required
              disabled={lockSeconds !== null}
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-black
              disabled:bg-gray-100"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              disabled={lockSeconds !== null}
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-black
              disabled:bg-gray-100"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading || lockSeconds !== null}
            className="w-full bg-black text-white py-2.5 rounded-lg
            font-medium hover:bg-gray-900 transition
            disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? "Logging in..."
              : lockSeconds !== null
              ? "Account Locked"
              : "Login"}
          </button>
        </form>

        {/* 🔐 Lock message */}
        {lockSeconds !== null && (
          <div className="mt-4 text-center text-sm text-red-600 font-medium">
            🔒 Account locked. Try again in{" "}
            <span className="font-bold">{formatTime(lockSeconds)}</span>
          </div>
        )}

        {/* Footer */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-black hover:underline"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
    </PageWrapper>
  );
}
