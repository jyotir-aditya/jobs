import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/app/models/user";
import connectDB from "@/app/utils/connectDB";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({}, { password: 0 });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users", error: error.message },
      { status: 500 }
    );
  }
}
