import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {useQuizStore} from "../store/quizStore.js"
import PageWrapper from "../components/PageWrapper.jsx";

import { useNavigate } from "react-router-dom";

export default function CreateQuiz() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctOptionIndex: 0,
    },
  ]);

  const handleQuestionChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].questionText = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctOptionIndex: 0,
      },
    ]);
  };

  const { createQuiz, loading } = useQuizStore();

  const submitQuiz = async (e) => {
    e.preventDefault();

    try {
      await createQuiz({
        title,
        description,
        questions: questions.map((q) => ({
          questionText: q.questionText,
          options: q.options.map((opt) => ({ text: opt })),
          correctOptionIndex: q.correctOptionIndex,
        })),
      });

      toast.success("Quiz created successfully 🎉");
      navigate("/dashboard");
    } catch {
      toast.error("Failed to create quiz");
    }
  };

  return (
    <PageWrapper>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow"
    >
      <h1 className="text-3xl font-bold mb-6">Create Quiz</h1>

      <form onSubmit={submitQuiz} className="space-y-6">
        {/* Quiz Title */}
        <div>
          <label className="font-medium">Quiz Title</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-lg mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            className="w-full border px-4 py-2 rounded-lg mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Questions */}
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="border rounded-lg p-4 space-y-3">
            <h3 className="font-semibold">Question {qIndex + 1}</h3>

            <input
              type="text"
              placeholder="Question text"
              className="w-full border px-3 py-2 rounded"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              required
            />

            {q.options.map((opt, oIndex) => (
              <div key={oIndex} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={q.correctOptionIndex === oIndex}
                  onChange={() => {
                    const updated = [...questions];
                    updated[qIndex].correctOptionIndex = oIndex;
                    setQuestions(updated);
                  }}
                />

                <input
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  className="flex-1 border px-3 py-2 rounded"
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  required
                />
              </div>
            ))}
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="border px-4 py-2 rounded-lg"
        >
          + Add Question
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Quiz"}
        </button>
      </form>
    </motion.div>
    </PageWrapper>
  );
}
