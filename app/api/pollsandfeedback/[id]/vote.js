// app/api/pollsandfeedback/[id]/vote.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import Poll from "@/models/PollsAndFeedback";
import { authOptions } from "@/lib/auth"; // or wherever next-auth config is

export async function POST(req, { params }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { id } = params;
  const { optionIndex } = await req.json();

  try {
    const poll = await Poll.findById(id);
    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    if (poll.voters.includes(userId)) {
      return NextResponse.json(
        { error: "You already voted!" },
        { status: 400 }
      );
    }

    poll.options[optionIndex].votes += 1;
    poll.voters.push(userId);
    await poll.save();

    return NextResponse.json({ message: "Vote recorded" });
  } catch (err) {
    return NextResponse.json({ error: "Vote failed" }, { status: 500 });
  }
}
