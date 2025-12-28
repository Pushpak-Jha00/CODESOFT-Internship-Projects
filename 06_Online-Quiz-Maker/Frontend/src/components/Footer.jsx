import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore.js";
import { Github, Instagram } from "lucide-react";

export default function Footer() {
  const { user } = useAuthStore();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gray-900 text-gray-300 mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Quiz<span className="text-indigo-400">Maker</span>
            </h2>
            <p className="text-sm text-gray-400 mt-3 max-w-sm">
              Create, attempt, and analyze quizzes in one modern
              platform designed for learning and practice.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/quizzes" className="hover:text-white transition">
                  Quizzes
                </Link>
              </li>

              {user && (
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-white transition"
                  >
                    Dashboard
                  </Link>
                </li>
              )}

              {!user && (
                <li>
                  <Link
                    to="/register"
                    className="hover:text-white transition"
                  >
                    Register
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              About Project
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              QuizMaker is a MERN stack based academic project
              focused on clean UI, authentication security,
              and user-friendly design.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="border-t border-gray-800 mt-10 pt-4
          flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Left */}
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} QuizMaker. All rights reserved.
          </p>

          {/* Center credit */}
          <p className="text-[11px] text-gray-500 tracking-wide text-center">
            Website made by{" "}
            <span className="font-medium text-gray-400">
              Pushpak Jha
            </span>
          </p>

          {/* Right socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Pushpak-Jha00?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <Github size={18} />
            </a>

            <a
              href="https://instagram.com/your-instagram-username"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-pink-400 transition"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
