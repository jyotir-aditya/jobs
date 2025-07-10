import User from "../../../models/User";
import bcrypt from "bcrypt";
import connectDB from "../../../utils/connectDB";

export default async function POST(req, res) {
  if (req.method === "POST") {
    const { name, email, password, phone, qualification, age } = req.body;

    try {
      await connectDB();

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
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
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
