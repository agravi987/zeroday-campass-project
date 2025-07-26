import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Complaint from "@/models/Complaint";

// GET /api/complaint/[id]
export async function GET(request, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return NextResponse.json(
        { error: "Complaint not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(complaint, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/complaint/[id]
export async function PUT(request, { params }) {
  await dbConnect();

  const { id } = params;
  const body = await request.json();

  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedComplaint) {
      return NextResponse.json(
        { error: "Complaint not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedComplaint, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE /api/complaint/[id]
export async function DELETE(request, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    const deletedComplaint = await Complaint.findByIdAndDelete(id);

    if (!deletedComplaint) {
      return NextResponse.json(
        { error: "Complaint not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Complaint deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
