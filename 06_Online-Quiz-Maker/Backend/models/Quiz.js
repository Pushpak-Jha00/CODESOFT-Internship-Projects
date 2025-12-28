import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },

  options: {
    type: [optionSchema],
    validate: [
      (val) => val.length >= 2,
      "At least two options are required",
    ],
  },

  correctOptionIndex: {
    type: Number,
    required: true,
  },
});

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    questions: {
      type: [questionSchema],
      validate: [
        (val) => val.length > 0,
        "Quiz must have at least one question",
      ],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
