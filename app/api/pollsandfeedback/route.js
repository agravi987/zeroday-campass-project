// app/api/pollsandfeedback/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Poll from "@/models/PollsAndFeedback";

// GET all polls
export async function GET() {
  await dbConnect();
  const polls = await Poll.find().sort({ createdAt: -1 });
  return NextResponse.json(polls);
}

// POST create a new poll
export async function POST(req) {
  await dbConnect();
  const { question, options, createdBy } = await req.json();

  if (!question || !options || options.length < 2) {
    return NextResponse.json({ error: "Invalid poll data" }, { status: 400 });
  }

  const formattedOptions = options.map((opt) => ({ text: opt, votes: 0 }));

  const newPoll = await Poll.create({
    question,
    options: formattedOptions,
    createdBy,
  });

  return NextResponse.json(newPoll, { status: 201 });
}
