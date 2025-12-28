import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function QuizCard({ quiz }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
    >
      <h3 className="text-lg font-semibold mb-2">
        {quiz.title}
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        {quiz.description || "No description provided"}
      </p>

      <Link
        to={`/quiz/${quiz._id}`}
        className="text-sm font-medium text-black underline"
      >
        Start Quiz →
      </Link>
    </motion.div>
  );
}
