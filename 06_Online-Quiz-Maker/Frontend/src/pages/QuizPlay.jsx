import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import toast from "react-hot-toast";

/* 🔀 SHUFFLE QUESTIONS ONLY */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function QuizPlay() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 🔒 Attempt check
  const [alreadyAttempted, setAlreadyAttempted] = useState(false);
  const [resultId, setResultId] = useState(null);

  // 🔹 Check if quiz already attempted
  useEffect(() => {
    const checkAttempt = async () => {
      try {
        const res = await api.get(`/results/check/${id}`);
        if (res.data.attempted) {
          setAlreadyAttempted(true);
          setResultId(res.data.resultId);
        }
      } catch {
        // ignore
      }
    };

    checkAttempt();
  }, [id]);

  // 🔹 Fetch quiz (WITH QUESTION SHUFFLE)
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/quizzes/${id}`);

        // 🔀 shuffle ONLY questions
        const shuffledQuestions = shuffleArray(res.data.quiz.questions);

        setQuiz({
          ...res.data.quiz,
          questions: shuffledQuestions,
        });
      } catch {
        toast.error("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  // 🚫 If already attempted → block quiz
  if (alreadyAttempted) {
    return (
      <div className="max-w-xl mx-auto text-center mt-12">
        <h2 className="text-2xl font-bold mb-4">
          You already attempted this quiz ✅
        </h2>

        <p className="text-gray-600 mb-6">
          You cannot attempt the same quiz again.
        </p>

        <Link
          to={`/result/${resultId}`}
          className="bg-black text-white px-6 py-3 rounded"
        >
          View Result
        </Link>
      </div>
    );
  }

  // 🔹 Select option
  const handleSelect = (optionIndex) => {
    setAnswers((prev) => {
      const updated = [...prev];
      // updated[current] = {
      //   questionIndex: current,
      //   selectedOptionIndex: optionIndex,
      // };
      updated[current] = {
        questionId: quiz.questions[current]._id,
        selectedOptionIndex: optionIndex,
      };

      return updated;
    });
  };

  // 🔹 Next question
  const nextQuestion = () => {
    if (!answers[current]) {
      toast.error("Please select an option");
      return;
    }
    setCurrent((prev) => prev + 1);
  };

  // 🔹 Previous question
  const prevQuestion = () => {
    setCurrent((prev) => prev - 1);
  };

  // 🔹 Submit quiz
  const submitQuiz = async () => {
    if (submitting) return;

    try {
      setSubmitting(true);

      const res = await api.post("/results/submit", {
        quizId: quiz._id,
        answers,
      });

      toast.success("Quiz submitted!");
      navigate(`/result/${res.data.resultId}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!quiz) return null;

  if (quiz.questions.length === 0) {
    return (
      <p className="text-center text-gray-600">This quiz has no questions.</p>
    );
  }

  const question = quiz.questions[current];
  const progress = ((current + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* 🔹 Progress */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-black rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Question {current + 1} of {quiz.questions.length}
        </p>
      </div>

      {/* 🔹 Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h2 className="text-xl font-semibold mb-4">
            {question.questionText}
          </h2>

          <div className="space-y-3">
            {question.options.map((opt, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`w-full text-left px-4 py-3 rounded border transition
                  ${
                    answers[current]?.selectedOptionIndex === index
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 🔹 Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevQuestion}
          disabled={current === 0}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Previous
        </button>

        {current === quiz.questions.length - 1 ? (
          <button
            onClick={submitQuiz}
            disabled={submitting}
            className="px-6 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Quiz"}
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-black text-white rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
