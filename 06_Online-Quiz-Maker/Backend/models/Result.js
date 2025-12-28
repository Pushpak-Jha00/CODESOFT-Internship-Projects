import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionIndex: {
    type: Number,
    required: true,
  },
  selectedOptionIndex: {
    type: Number,
    required: true,
  },
});

const resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    answers: [answerSchema],

    score: {
      type: Number,
      required: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);
export default Result;
