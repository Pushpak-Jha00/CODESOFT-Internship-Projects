import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Find Your <span className="text-blue-600">Dream Job</span><br />
            Or Hire Top Talent
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            A modern job portal where candidates discover opportunities and
            employers find the right people faster.
          </p>

          {/* CTA BUTTONS */}
          {!user ? (
            <div className="mt-8 flex gap-4">
              <Link
                to="/jobs"
                className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 transition"
              >
                Browse Jobs
              </Link>

              <Link
                to="/register"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded font-medium hover:bg-blue-50 transition"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="mt-8">
              <p className="text-lg mb-4">
                Welcome back, <b>{user.name}</b>
              </p>

              {user.role === "candidate" ? (
                <div className="flex gap-4">
                  <Link
                    to="/jobs"
                    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                  >
                    Find Jobs
                  </Link>

                  <Link
                    to="/candidate"
                    className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-50 transition"
                  >
                    My Applications
                  </Link>
                </div>
              ) : (
                <Link
                  to="/employer"
                  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                >
                  Go to Employer Dashboard
                </Link>
              )}
            </div>
          )}
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block"
        >
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Job search"
            className="rounded-xl shadow-lg"
          />
        </motion.div>

      </div>

      {/* FEATURE SECTION */}
      <div className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          
          <motion.div whileHover={{ y: -5 }} className="p-6 rounded shadow">
            <h3 className="text-xl font-bold">Verified Jobs</h3>
            <p className="mt-3 text-gray-600">
              All job listings are posted by verified employers.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="p-6 rounded shadow">
            <h3 className="text-xl font-bold">Easy Applications</h3>
            <p className="mt-3 text-gray-600">
              Apply for jobs in just one click with your resume.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="p-6 rounded shadow">
            <h3 className="text-xl font-bold">Employer Dashboard</h3>
            <p className="mt-3 text-gray-600">
              Manage job posts and view applicants efficiently.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
