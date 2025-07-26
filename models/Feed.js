// models/Feed.js
import mongoose from "mongoose";

const feedSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    link: String,
    category: String, // e.g., "Hackathon", "Internship", "Tech News"
  },
  { timestamps: true }
);

export default mongoose.models.Feed || mongoose.model("Feed", feedSchema);
