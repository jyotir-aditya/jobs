import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/app/models/user";
import connectDB from "@/app/utils/connectDB";

export async function POST(request) {
  const { name, email, password, phone, qualification, age } =
    await request.json();

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminEmails = ["pratyusha.das.stats@gmail.com"];
    const isAdmin = adminEmails.includes(email);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      qualification,
      age,
      isAdmin,
    });

    await newUser.save();
    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error registering user", error: error.message },
      { status: 500 }
    );
  }
}
