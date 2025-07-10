import { NextResponse } from "next/server";
import User from "@/app/models/user";
import connectDB from "@/app/utils/connectDB";

export async function POST(request) {
  const { email, lastLogin, device } = await request.json();

  try {
    await connectDB();

    await User.updateOne({ email }, { $set: { lastLogin, device } });
    return NextResponse.json({ message: "Session logged" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error logging session", error: error.message },
      { status: 500 }
    );
  }
}
