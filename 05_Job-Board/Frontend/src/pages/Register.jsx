import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "candidate",
    companyName: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const passwordsMatch =
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword;

  const passwordsMismatch =
    form.password &&
    form.confirmPassword &&
    form.password !== form.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (form.role === "employer" && !form.companyName) {
      toast.error("Company name is required for employer account");
      return;
    }

    try {
      await register(form);
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md"
      >
        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Create Account
        </h2>
        <p className="text-center text-gray-600 text-sm mt-2">
          Register to start applying or hiring
        </p>

        {/* NAME */}
        <input
          name="name"
          placeholder="Full name"
          className="w-full border rounded-lg px-4 py-2 mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        {/* EMAIL */}
        <input
          name="email"
          type="email"
          placeholder="Email address"
          className="w-full border rounded-lg px-4 py-2 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <div className="relative mt-4">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-black"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative mt-4">
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            className="w-full border rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-black"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* LIVE PASSWORD MATCH INDICATOR */}
        {passwordsMatch && (
          <p className="text-sm text-green-600 mt-2">
            ✓ Passwords match
          </p>
        )}

        {passwordsMismatch && (
          <p className="text-sm text-red-600 mt-2">
            ✕ Passwords do not match
          </p>
        )}

        {/* ROLE */}
        <select
          name="role"
          className="w-full border rounded-lg px-4 py-2 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        >
          <option value="candidate">Candidate</option>
          <option value="employer">Employer</option>
        </select>

        {/* COMPANY NAME */}
        <AnimatePresence>
          {form.role === "employer" && (
            <motion.input
              name="companyName"
              placeholder="Company name"
              className="w-full border rounded-lg px-4 py-2 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            />
          )}
        </AnimatePresence>

        {/* REGISTER BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 py-2 rounded-lg text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
