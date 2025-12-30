import Quiz from "../models/Quiz.js";
import Result from "../models/Result.js";

/* =============================
   SUBMIT QUIZ (PRIVATE) submitQuid
============================= */
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const userId = req.user._id;

    // 🔒 Check if already attempted
    const existingResult = await Result.findOne({
      user: userId,
      quiz: quizId,
    });

    if (existingResult) {
      return res.status(400).json({
        message: "You have already attempted this quiz",
        resultId: existingResult._id,
      });
    }

    // 🔹 Check quiz exists
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    // 🔹 Calculate score (SAFE)
    // let score = 0;

    // quiz.questions.forEach((q, index) => {
    //   const userAnswer = answers.find(
    //     (a) => a.questionIndex === index
    //   );

    //   if (
    //     userAnswer &&
    //     userAnswer.selectedOptionIndex === q.correctOptionIndex
    //   ) {
    //     score++;
    //   }
    // });

    let score = 0;

    answers.forEach((ans) => {
      const question = quiz.questions.find(
        (q) => q._id.toString() === ans.questionId
      );

      if (!question) return;

      if (ans.selectedOptionIndex === question.correctOptionIndex) {
        score++;
      }
    });

    // 🔹 Save result
    const result = await Result.create({
      user: userId,
      quiz: quizId,
      score,
      totalQuestions: quiz.questions.length,
      answers,
    });

    return res.status(201).json({
      message: "Quiz submitted",
      resultId: result._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error while submitting quiz",
    });
  }
};

/* =============================
   GET RESULT BY ID (PRIVATE)
============================= */
export const getResultById = async (req, res, next) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate("quiz", "title questions")
      .populate("user", "name email");

    if (!result) {
      res.status(404);
      throw new Error("Result not found");
    }

    // Ensure only owner can view result
    if (result.user._id.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Access denied");
    }

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

/* =============================
   GET MY ATTEMPTS (PRIVATE)
============================= */
export const getMyAttempts = async (req, res, next) => {
  try {
    const attempts = await Result.find({
      user: req.user._id,
    })
      .populate("quiz", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: attempts.length,
      attempts: attempts.map((attempt) => ({
        _id: attempt._id, // ✅ FIXED
        quizTitle: attempt.quiz.title,
        score: attempt.score,
        totalQuestions: attempt.totalQuestions,
        attemptedAt: attempt.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const checkAttempt = async (req, res) => {
  const result = await Result.findOne({
    user: req.user._id,
    quiz: req.params.quizId,
  });

  if (result) {
    return res.json({
      attempted: true,
      resultId: result._id,
    });
  }

  res.json({ attempted: false });
};

export const getQuizAttempts = async (req, res) => {
  try {
    const { quizId } = req.params;

    // 🔒 Check quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // 🔹 Fetch attempts
    const attempts = await Result.find({ quiz: quizId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: attempts.length,
      attempts: attempts.map((a) => ({
        _id: a._id,
        userName: a.user.name,
        userEmail: a.user.email,
        score: a.score,
        totalQuestions: a.totalQuestions,
        attemptedAt: a.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch quiz attempts",
    });
  }
};
