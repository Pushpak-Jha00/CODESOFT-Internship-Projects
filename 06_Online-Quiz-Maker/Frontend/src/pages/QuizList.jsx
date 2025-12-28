import { useEffect } from "react";
import { motion } from "framer-motion";
import {useQuizStore} from "../store/quizStore.js";
import { useNavigate } from "react-router-dom";

export default function QuizList() {
  const { quizzes, fetchQuizzes, loading, error } = useQuizStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  if (loading) {
    return <p className="text-center">Loading quizzes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Available Quizzes</h2>

      {quizzes.length === 0 ? (
        <p className="text-center text-gray-600">
          No quizzes available right now.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              className="bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src="https://images.unsplash.com/photo-1513258496099-48168024aec0"
                alt={quiz.title}
                className="h-40 w-full object-cover rounded-t-xl"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold">{quiz.title}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {quiz.description || "No description provided"}
                </p>

                <button
                  onClick={() => navigate(`/quiz/${quiz._id}`)}
                  className="mt-4 w-full bg-black text-white py-2 rounded"
                >
                  Start Quiz
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
