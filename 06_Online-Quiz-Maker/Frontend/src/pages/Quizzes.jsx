import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuizStore } from "../store/quizStore.js";
import { PlayCircle, BarChart3 } from "lucide-react";

export default function Quizzes() {
  const { quizzes, fetchQuizzes, loading, error } = useQuizStore();

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          All Quizzes
        </h1>
        <p className="text-gray-500 mt-1">
          Attempt quizzes and check your performance
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500 font-medium">
          {error}
        </p>
      )}

      {/* Empty */}
      {!loading && quizzes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-600">
            No quizzes available right now.
          </p>
        </div>
      )}

      {/* Quiz Cards */}
      {!loading && quizzes.length > 0 && (
        <div className="grid gap-6 md:grid-cols-3">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="relative p-6 rounded-2xl border bg-white
              hover:shadow-xl transition-all duration-300"
            >
              {/* Status Badge */}
              {quiz.attempted && (
                <span className="absolute top-4 right-4 text-xs font-semibold
                bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Attempted
                </span>
              )}

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900">
                {quiz.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 mt-1 line-clamp-3">
                {quiz.description || "No description provided"}
              </p>

              {/* Action */}
              <div className="mt-6">
                {quiz.attempted ? (
                  <Link
                    to={`/result/${quiz.resultId}`}
                    className="inline-flex items-center gap-2 text-green-600
                    font-medium hover:underline"
                  >
                    <BarChart3 size={18} />
                    View Result
                  </Link>
                ) : (
                  <Link
                    to={`/quiz/${quiz._id}`}
                    className="inline-flex items-center gap-2 text-indigo-600
                    font-medium hover:underline"
                  >
                    <PlayCircle size={18} />
                    Start Quiz
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
