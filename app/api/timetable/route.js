import dbConnect from "../../../lib/mongodb";
import TimetableEntry from "../../../models/TimetableEntry";

export async function GET(request) {
  try {
    await dbConnect();
    const entries = await TimetableEntry.find({}).lean();
    return new Response(JSON.stringify(entries), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch timetable entries", { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Validate required fields
    const { userId, day, time, subject, location } = data;
    if (!userId || !day || !time || !subject) {
      return new Response("Missing required fields", { status: 400 });
    }

    const newEntry = new TimetableEntry({
      userId,
      day,
      time,
      subject,
      location,
    });

    await newEntry.save();

    return new Response(JSON.stringify(newEntry), { status: 201 });
  } catch (error) {
    return new Response("Failed to save timetable entry", { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const { id, userId, day, time, subject, location } = data;

    if (!id) {
      return new Response("Missing entry id", { status: 400 });
    }

    const entry = await TimetableEntry.findById(id);
    if (!entry) {
      return new Response("Entry not found", { status: 404 });
    }

    entry.userId = userId || entry.userId;
    entry.day = day || entry.day;
    entry.time = time || entry.time;
    entry.subject = subject || entry.subject;
    entry.location = location || entry.location;

    await entry.save();

    return new Response(JSON.stringify(entry), { status: 200 });
  } catch (error) {
    return new Response("Failed to update timetable entry", { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Missing entry id", { status: 400 });
    }

    await TimetableEntry.findByIdAndDelete(id);

    return new Response("Entry deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete timetable entry", { status: 500 });
  }
}
