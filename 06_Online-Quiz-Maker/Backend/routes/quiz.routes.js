import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getMyQuizzes,
  getQuizById,
} from "../controllers/quiz.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// My quizzes
router.get("/my", protect, getMyQuizzes);

// Create quiz (authenticated)
router.post("/", protect, createQuiz);

// Get all quizzes (public)
router.get("/", getAllQuizzes);

// Get single quiz (public)
router.get("/:id", getQuizById);



export default router;
