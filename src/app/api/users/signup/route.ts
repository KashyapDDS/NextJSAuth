import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, username } = reqBody;

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: hashedpassword,
    });

    const savedUser = await newUser.save();
    console.log("saveduser:", savedUser);

    // Send Verificfication  Email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User Registration Success",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
