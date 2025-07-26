import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import LostFoundItem from "../../../models/LostFoundItem";

export async function GET(request) {
  await dbConnect();
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type"); // "lost" or "found"
    const category = url.searchParams.get("category");
    const date = url.searchParams.get("date");

    let filter = {};
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      filter.date = { $gte: start, $lt: end };
    }

    const items = await LostFoundItem.find(filter).sort({ date: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch lost and found items" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const data = await request.json();
    const item = new LostFoundItem(data);
    await item.save();
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create lost and found item" },
      { status: 500 }
    );
  }
}
