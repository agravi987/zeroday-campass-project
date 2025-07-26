import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Complaint from "../../../models/Complaint";

export async function GET(request) {
  await dbConnect();
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status"); // Pending, In Progress, Resolved
    let filter = {};
    if (status) filter.status = status;

    const complaints = await Complaint.find(filter).sort({ date: -1 });
    return NextResponse.json(complaints);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch complaints" }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const data = await request.json();
    const complaint = new Complaint(data);
    await complaint.save();
    return NextResponse.json(complaint, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create complaint" }, { status: 500 });
  }
}

export async function PUT(request) {
  await dbConnect();
  try {
    const data = await request.json();
    const { id, ...updateData } = data;
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const updatedComplaint = await Complaint.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updatedComplaint);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update complaint" }, { status: 500 });
  }
}
