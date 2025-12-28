import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyQuizzes = async () => {
      try {
        const res = await api.get("/quizzes/my");
        setQuizzes(res.data.quizzes);
      } catch {
        setError("Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchMyQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        Loading quizzes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Quizzes</h2>

      {quizzes.length === 0 ? (
        <p className="text-gray-600">
          You haven’t created any quizzes yet.
        </p>
      ) : (
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{quiz.title}</h3>
                <p className="text-gray-500 text-sm">
                  Created on{" "}
                  {new Date(quiz.createdAt).toDateString()}
                </p>
              </div>

              {/* ✅ CORRECT VIEW BUTTON */}
              <button
                onClick={() =>
                  navigate(`/dashboard/quizzes/${quiz._id}/attempts`)
                }
                className="text-sm text-blue-600 hover:underline"
              >
                View Attempts
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
