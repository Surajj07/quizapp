import mongoose, { Schema, models } from "mongoose";

const QuizResultSchema = new Schema(
  {
    name: String,
    email: String,
    answers: { type: Object },
    recommendation: String,
  },
  { timestamps: true }
);

export default models.QuizResult ||
  mongoose.model("QuizResult", QuizResultSchema);
