import bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { sendVerifyEmail } from "@/app/actions/sendEmail";
import { errors } from "@/helpers/responseVariants";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse(
        errors.MISSING_INFO.message,
        errors.MISSING_INFO.status
      );
    }

    const isUserExist = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (isUserExist) {
      return new NextResponse(
        errors.USER_EXIST.message,
        errors.USER_EXIST.status
      );
    }

    const nanoid = customAlphabet("1234567890abcdef", 16);
    const verificationToken = nanoid();
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        verificationToken,
      },
    });

    await sendVerifyEmail(email, verificationToken, user.id, name);

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse(
      errors.INTERNAL_ERROR.message,
      errors.INTERNAL_ERROR.status
    );
  }
}
