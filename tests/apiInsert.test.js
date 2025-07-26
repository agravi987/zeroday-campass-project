import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import LostFoundItem from "../models/LostFoundItem";
import TimetableEntry from "../models/TimetableEntry";
import Complaint from "../models/Complaint";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("MongoDB Insert Tests", () => {
  test("Insert LostFoundItem", async () => {
    const item = new LostFoundItem({
      title: "Lost Wallet",
      description: "Black leather wallet",
      category: "Accessories",
      image: "http://example.com/wallet.jpg",
      contact: { email: "test@example.com", phone: "1234567890" },
      location: "Library",
      type: "lost",
      reportedBy: "John Doe",
    });
    const saved = await item.save();
    expect(saved._id).toBeDefined();
    expect(saved.title).toBe("Lost Wallet");
  });

  test("Insert TimetableEntry", async () => {
    const entry = new TimetableEntry({
      userId: new mongoose.Types.ObjectId(),
      day: "Monday",
      time: "09:00 AM",
      subject: "Math",
      location: "Room 101",
    });
    const saved = await entry.save();
    expect(saved._id).toBeDefined();
    expect(saved.subject).toBe("Math");
  });

  test("Insert Complaint", async () => {
    const complaint = new Complaint({
      title: "Leaky Faucet",
      description: "The faucet in room 202 is leaking",
      priority: "High",
      category: "Plumbing",
      hostelBlock: "Block A",
      room: "202",
      status: "Pending",
      reportedBy: "Jane Smith",
    });
    const saved = await complaint.save();
    expect(saved._id).toBeDefined();
    expect(saved.status).toBe("Pending");
  });
});
