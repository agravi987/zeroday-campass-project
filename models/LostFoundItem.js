import mongoose from "mongoose";

const LostFoundItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or base64 string
  },
  contact: {
    email: String,
    phone: String,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["lost", "found"],
    required: true,
  },
  reportedBy: {
    type: String,
  },
});

const LostFoundItem = mongoose.models.LostFoundItem || mongoose.model("LostFoundItem", LostFoundItemSchema);

export default LostFoundItem;
