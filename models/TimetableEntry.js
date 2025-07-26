import mongoose from "mongoose";

const TimetableEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  day: {
    type: String,
    required: true,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  time: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
});

const TimetableEntry = mongoose.models.TimetableEntry || mongoose.model("TimetableEntry", TimetableEntrySchema);

export default TimetableEntry;
