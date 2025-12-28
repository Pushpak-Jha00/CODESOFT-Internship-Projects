import { useEffect, useState } from "react";
import api from "../api/axios";
import PageWrapper from "../components/PageWrapper";

export default function MyAttempts() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await api.get("/results/my");
        setAttempts(res.data.attempts);
      } catch {
        setError("Failed to load attempts");
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        Loading attempts...
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
    <PageWrapper>
    <div className="max-w-4xl mx-auto">
      {/* 🔹 HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          My Attempts
        </h2>

        <p className="text-gray-600 mt-1">
          Total quizzes attempted:{" "}
          <span className="font-semibold">
            {attempts.length}
          </span>
        </p>
      </div>

      {attempts.length === 0 ? (
        <p className="text-gray-600">
          You haven’t attempted any quizzes yet.
        </p>
      ) : (
        <div className="space-y-4">
          {attempts.map((a) => (
            <div
              key={a.id}
              className="bg-white p-4 rounded shadow"
            >
              <h3 className="font-semibold">
                {a.quizTitle}
              </h3>

              <p className="text-gray-600">
                Score: {a.score}/{a.totalQuestions}
              </p>

              <p className="text-gray-400 text-sm">
                {new Date(a.attemptedAt).toDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    </PageWrapper>
  );
}
