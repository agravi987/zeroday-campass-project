import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Announcement from "@/models/Announcement";

export async function GET(request) {
  try {
    await dbConnect();
    const announcements = await Announcement.find().sort({ date: -1 });
    return NextResponse.json(announcements);
  } catch (error) {
    console.error("API GET /announcements error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch announcements" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const announcement = new Announcement(data);
    await announcement.save();
    return NextResponse.json(announcement, { status: 201 });
  } catch (error) {
    console.error("API POST /announcements error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create announcement" },
      { status: 500 }
    );
  }
}
