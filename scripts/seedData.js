import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnect from "../lib/mongodb.js";
import User from "../models/User.js";
import Announcement from "../models/Announcement.js";
import LostFoundItem from "../models/LostFoundItem.js";
import TimetableEntry from "../models/TimetableEntry.js";
import Complaint from "../models/Complaint.js";

dotenv.config();

async function seed() {
  try {
    await dbConnect();

    // Clear existing data
    await User.deleteMany({});
    await Announcement.deleteMany({});
    await LostFoundItem.deleteMany({});
    await TimetableEntry.deleteMany({});
    await Complaint.deleteMany({});

    // Seed Users
    const user1 = new User({
      email: "student@example.com",
      password: "hashedpassword", // Replace with actual hashed password
      role: "student",
    });
    const user2 = new User({
      email: "admin@example.com",
      password: "hashedpassword", // Replace with actual hashed password
      role: "admin",
    });
    await user1.save();
    await user2.save();

    // Seed Announcements
    const announcement = new Announcement({
      title: "Welcome to CampusLink",
      content: "This is the first announcement.",
      category: "General",
      date: new Date(),
    });
    await announcement.save();

    // Seed LostFoundItem
    const lostItem = new LostFoundItem({
      title: "Lost Wallet",
      description: "Black leather wallet",
      category: "Accessories",
      image: "http://example.com/wallet.jpg",
      contact: { email: "student@example.com", phone: "1234567890" },
      location: "Library",
      type: "lost",
      reportedBy: "student@example.com",
    });
    await lostItem.save();

    // Seed TimetableEntry
    const timetableEntry = new TimetableEntry({
      userId: user1._id,
      day: "Monday",
      time: "09:00 AM",
      subject: "Mathematics",
      location: "Room 101",
    });
    await timetableEntry.save();

    // Seed Complaint
    const complaint = new Complaint({
      title: "Leaky Faucet",
      description: "The faucet in room 202 is leaking",
      priority: "High",
      category: "Plumbing",
      hostelBlock: "Block A",
      room: "202",
      status: "Pending",
      reportedBy: "student@example.com",
    });
    await complaint.save();

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
