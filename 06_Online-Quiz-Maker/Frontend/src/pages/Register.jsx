import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 🔐 password checks
  const passwordChecks = {
    length: form.password.length >= 8,
    upper: /[A-Z]/.test(form.password),
    lower: /[a-z]/.test(form.password),
    number: /\d/.test(form.password),
    special: /[@$!%*?&]/.test(form.password),
  };

  const strengthScore = Object.values(passwordChecks).filter(Boolean).length;

  const strengthLabel =
    strengthScore <= 2
      ? "Weak"
      : strengthScore <= 4
      ? "Medium"
      : "Strong";

  const passwordsMatch =
    form.confirmPassword &&
    form.password === form.confirmPassword;

  const canSubmit =
    strengthLabel === "Strong" && passwordsMatch;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    try {
      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      toast.success("Account created successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const Rule = ({ ok, text }) => (
    <div className="flex items-center gap-2 text-xs">
      {ok ? (
        <CheckCircle size={14} className="text-green-600" />
      ) : (
        <XCircle size={14} className="text-gray-400" />
      )}
      <span className={ok ? "text-green-600" : "text-gray-500"}>
        {text}
      </span>
    </div>
  );

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
          <h2 className="text-3xl font-bold mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm">
            Join QuizMaker and start creating quizzes
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 py-2.5 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 py-2.5 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Match Indicator */}
          {form.confirmPassword && (
            <p
              className={`text-xs font-medium ${
                passwordsMatch
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {passwordsMatch
                ? "Passwords match"
                : "Passwords do not match"}
            </p>
          )}

          {/* Strength Indicator */}
          {form.password && (
            <div className="space-y-2">
              <div className="w-full h-2 rounded bg-gray-200">
                <div
                  className={`h-2 rounded transition-all ${
                    strengthLabel === "Strong"
                      ? "bg-green-500"
                      : strengthLabel === "Medium"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${(strengthScore / 5) * 100}%` }}
                />
              </div>

              <p className="text-xs font-medium">
                Password strength:{" "}
                <span
                  className={
                    strengthLabel === "Strong"
                      ? "text-green-600"
                      : strengthLabel === "Medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                >
                  {strengthLabel}
                </span>
              </p>

              <div className="grid grid-cols-2 gap-1">
                <Rule ok={passwordChecks.length} text="8+ characters" />
                <Rule ok={passwordChecks.upper} text="Uppercase letter" />
                <Rule ok={passwordChecks.lower} text="Lowercase letter" />
                <Rule ok={passwordChecks.number} text="Number" />
                <Rule ok={passwordChecks.special} text="Special character" />
              </div>
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-black text-white py-2.5 rounded-lg font-medium
            hover:bg-gray-900 transition
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-black hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
    </PageWrapper>
  );
}
