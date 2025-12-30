import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function QuizResult() {
  const { id } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch result
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await api.get(`/results/${id}`);
        setResult(res.data.result);
      } catch {
        toast.error("Failed to load result");
        setError("Unable to load quiz result");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading result...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!result) return null;

  const totalQuestions = result.totalQuestions || 0;
  const percentage =
    totalQuestions > 0 ? Math.round((result.score / totalQuestions) * 100) : 0;

  const answers = result.answers || [];

  return (
    <div className="max-w-4xl mx-auto">
      {/* 🔹 Score Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2">Quiz Result 🎉</h1>

        <p className="text-gray-600 mb-4">{result.quiz?.title}</p>

        <div className="text-5xl font-bold mb-2">
          {result.score} / {totalQuestions}
        </div>

        <p className="text-lg text-gray-500">Score: {percentage}%</p>

        <Link
          to="/quizzes"
          className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg"
        >
          Take Another Quiz
        </Link>
      </motion.div>

      {/* 🔹 Answer Review */}
      <div className="space-y-6">
        {result.quiz.questions.map((q, index) => {
          // const userAnswer = answers.find(
          //   (a) => a.questionIndex === index
          // );
          const userAnswer = answers.find((a) => a.questionId === q._id);

          const isCorrect =
            userAnswer?.selectedOptionIndex === q.correctOptionIndex;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              className="bg-white p-5 rounded-xl shadow"
            >
              <h3 className="font-semibold mb-3">
                {index + 1}. {q.questionText}
              </h3>

              <ul className="space-y-2">
                {q.options.map((opt, i) => {
                  let style = "border";

                  if (i === q.correctOptionIndex) {
                    style = "border-green-500 bg-green-50";
                  }

                  if (i === userAnswer?.selectedOptionIndex && !isCorrect) {
                    style = "border-red-500 bg-red-50";
                  }

                  return (
                    <li key={i} className={`px-4 py-2 rounded border ${style}`}>
                      {opt.text}
                    </li>
                  );
                })}
              </ul>

              <p
                className={`mt-3 font-medium ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isCorrect ? "Correct Answer" : "Wrong Answer"}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
