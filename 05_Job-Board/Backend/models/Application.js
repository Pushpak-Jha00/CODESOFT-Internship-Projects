// models/Application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    resume: { type: String, required: true },

    status: {
      type: String,
      enum: ["Applied", "Reviewed", "Rejected", "Selected"],
      default: "Applied"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
