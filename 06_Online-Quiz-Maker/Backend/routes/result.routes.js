import express from "express";
import {
  submitQuiz,
  getResultById,
  getMyAttempts,
  checkAttempt,
  getQuizAttempts,
} from "../controllers/result.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit quiz
router.post("/submit", protect, submitQuiz);

// My attempts
router.get("/my", protect, getMyAttempts);
router.get("/check/:quizId", protect, checkAttempt);
router.get("/quiz/:quizId", protect, getQuizAttempts);

// Get result
router.get("/:id", protect, getResultById);

export default router;
