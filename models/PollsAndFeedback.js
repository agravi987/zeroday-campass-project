import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: String,
  votes: { type: Number, default: 0 },
});

const pollSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [optionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // NEW
  },
  { timestamps: true }
);

export default mongoose.models.Poll || mongoose.model("Poll", pollSchema);
