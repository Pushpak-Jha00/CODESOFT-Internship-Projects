import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function EditQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* =====================
     FETCH QUIZ
  ====================== */
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/quizzes/${id}`);
        setQuiz(res.data.quiz);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to load quiz"
        );
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id, navigate]);

  /* =====================
     HANDLERS
  ====================== */

  const updateTitle = (value) => {
    setQuiz({ ...quiz, title: value });
  };

  const updateDescription = (value) => {
    setQuiz({ ...quiz, description: value });
  };

  const updateQuestionText = (qIndex, value) => {
    const updated = { ...quiz };
    updated.questions[qIndex].questionText = value;
    setQuiz(updated);
  };

  const updateOptionText = (qIndex, oIndex, value) => {
    const updated = { ...quiz };
    updated.questions[qIndex].options[oIndex].text = value;
    setQuiz(updated);
  };

  const updateCorrectOption = (qIndex, oIndex) => {
    const updated = { ...quiz };
    updated.questions[qIndex].correctOptionIndex = oIndex;
    setQuiz(updated);
  };

  /* =====================
     SAVE QUIZ
  ====================== */
  const handleSave = async () => {
    try {
      setSaving(true);

      await api.put(`/quizzes/${id}`, {
        title: quiz.title,
        description: quiz.description,
        questions: quiz.questions,
      });

      toast.success("Quiz updated successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =====================
     UI STATES
  ====================== */
  if (loading) {
    return (
      <p className="text-center mt-10">Loading quiz...</p>
    );
  }

  if (!quiz) return null;

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Edit Quiz
      </h1>

      {/* =====================
          QUIZ META
      ====================== */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <label className="block mb-2 font-medium">
          Quiz Title
        </label>
        <input
          value={quiz.title}
          onChange={(e) => updateTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded mb-4"
        />

        <label className="block mb-2 font-medium">
          Description
        </label>
        <textarea
          value={quiz.description || ""}
          onChange={(e) =>
            updateDescription(e.target.value)
          }
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      {/* =====================
          QUESTIONS
      ====================== */}
      <div className="space-y-6">
        {quiz.questions.map((q, qIndex) => (
          <div
            key={q._id}
            className="bg-white p-6 rounded shadow"
          >
            {/* Question Text */}
            <label className="block mb-2 font-semibold">
              Question {qIndex + 1}
            </label>
            <input
              value={q.questionText}
              onChange={(e) =>
                updateQuestionText(
                  qIndex,
                  e.target.value
                )
              }
              className="w-full border px-4 py-2 rounded mb-4"
            />

            {/* Options */}
            <div className="space-y-2">
              {q.options.map((opt, oIndex) => (
                <div
                  key={oIndex}
                  className="flex items-center gap-3"
                >
                  <input
                    type="radio"
                    checked={
                      q.correctOptionIndex === oIndex
                    }
                    onChange={() =>
                      updateCorrectOption(
                        qIndex,
                        oIndex
                      )
                    }
                  />

                  <input
                    value={opt.text}
                    onChange={(e) =>
                      updateOptionText(
                        qIndex,
                        oIndex,
                        e.target.value
                      )
                    }
                    className="flex-1 border px-3 py-2 rounded"
                  />

                  {q.correctOptionIndex === oIndex && (
                    <span className="text-green-600 text-sm font-medium">
                      Correct
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* =====================
          ACTIONS
      ====================== */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-black text-white rounded disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
