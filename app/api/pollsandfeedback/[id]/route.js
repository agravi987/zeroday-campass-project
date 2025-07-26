// app/api/pollsandfeedback/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Poll from "@/models/PollsAndFeedback";

// GET /api/pollsandfeedback/:id - Get a single poll
export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const poll = await Poll.findById(id);
    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }
    return NextResponse.json(poll);
  } catch (err) {
    return NextResponse.json({ error: "Invalid poll ID" }, { status: 400 });
  }
}

// DELETE /api/pollsandfeedback/:id - Delete a poll
export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const deletedPoll = await Poll.findByIdAndDelete(id);
    if (!deletedPoll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Poll deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Invalid poll ID" }, { status: 400 });
  }
}

// PATCH /api/pollsandfeedback/:id - Update poll (optional)
export async function PATCH(req, { params }) {
  await dbConnect();
  const { id } = params;
  const { question, options } = await req.json();

  try {
    const poll = await Poll.findById(id);
    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    if (question) poll.question = question;
    if (options && options.length >= 2) {
      poll.options = options.map((text) => ({ text, votes: 0 }));
    }

    await poll.save();
    return NextResponse.json(poll);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update poll" },
      { status: 500 }
    );
  }
}
