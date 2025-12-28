import User from "../models/User.js";
import Quiz from "../models/Quiz.js";
import Result from "../models/Result.js";

export const getPlatformStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const quizzesCount = await Quiz.countDocuments();
    const attemptsCount = await Result.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        users: usersCount,
        quizzes: quizzesCount,
        attempts: attemptsCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
    });
  }
};
