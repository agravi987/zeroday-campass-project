import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Feed from "@/models/Feed";

// GET - Fetch all feeds
export async function GET() {
  try {
    await dbConnect();
    const feeds = await Feed.find().sort({ createdAt: -1 });
    return NextResponse.json(feeds);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch feeds" },
      { status: 500 }
    );
  }
}

// POST - Add a new feed
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description, link, category } = body;

    if (!title || !description || !link || !category) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();
    const newFeed = new Feed({ title, description, link, category });
    await newFeed.save();

    return NextResponse.json({ message: "Feed added successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add feed" }, { status: 500 });
  }
}
