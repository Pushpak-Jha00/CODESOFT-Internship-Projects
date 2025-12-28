import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function QuizAttempts() {
  const { quizId } = useParams();

  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizAttempts = async () => {
      try {
        const res = await api.get(`/results/quiz/${quizId}`);
        setAttempts(res.data.attempts);
      } catch {
        setError("Failed to load quiz attempts");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizAttempts();
  }, [quizId]);

  if (loading) {
    return <p className="text-center">Loading quiz attempts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Quiz Attempts
      </h2>

      {attempts.length === 0 ? (
        <p className="text-gray-600">
          No one has attempted this quiz yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-center">Score</th>
                <th className="p-3 text-center">Date</th>
              </tr>
            </thead>

            <tbody>
              {attempts.map((a) => (
                <tr key={a._id} className="border-t">
                  <td className="p-3">{a.userName}</td>
                  <td className="p-3">{a.userEmail}</td>
                  <td className="p-3 text-center">
                    {a.score}/{a.totalQuestions}
                  </td>
                  <td className="p-3 text-center">
                    {new Date(a.attemptedAt).toDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
