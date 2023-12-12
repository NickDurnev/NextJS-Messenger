import bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { sendVerifyEmail } from "@/app/actions/sendEmail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const nanoid = customAlphabet("1234567890abcdef", 16);
    const verificationToken = nanoid();
    const hashedPassword = await bcrypt.hash(password, 12);

    await sendVerifyEmail(email, verificationToken);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        verificationToken,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
