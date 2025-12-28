import Quiz from "../models/Quiz.js";

/* =========================
   CREATE QUIZ (PRIVATE)
========================= */
export const createQuiz = async (req, res, next) => {
  try {
    const { title, description, questions } = req.body;

    if (!title || !questions || questions.length === 0) {
      res.status(400);
      throw new Error("Title and questions are required");
    }

    const quiz = await Quiz.create({
      title,
      description,
      questions,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      quizId: quiz._id,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   GET ALL QUIZZES (PUBLIC)
========================= */
export const getAllQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find()
      .select("title description createdAt")
      .populate("createdBy", "name");

    res.status(200).json({
      success: true,
      quizzes,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   GET SINGLE QUIZ (PUBLIC)
========================= */
export const getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate(
      "createdBy",
      "name"
    );

    if (!quiz) {
      res.status(404);
      throw new Error("Quiz not found");
    }

    res.status(200).json({
      success: true,
      quiz,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   GET MY QUIZZES (PRIVATE)
========================= */
export const getMyQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find({
      createdBy: req.user._id,
    }).select("title description createdAt");

    res.status(200).json({
      success: true,
      count: quizzes.length,
      quizzes,
    });
  } catch (error) {
    next(error);
  }
};
