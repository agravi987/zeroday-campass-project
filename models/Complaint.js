import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  category: {
    type: String,
    required: true,
  },
  hostelBlock: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  reportedBy: {
    type: String,
  },
});

const Complaint = mongoose.models.Complaint || mongoose.model("Complaint", ComplaintSchema);

export default Complaint;
