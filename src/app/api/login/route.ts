import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { errors } from "@/helpers/responseVariants";
import { signJwtAccessToken } from "@/app/libs/jwt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse(
        errors.MISSING_INFO.message,
        errors.MISSING_INFO.status
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new NextResponse(
        errors.USER_NOT_FOUND.message,
        errors.USER_NOT_FOUND.status
      );
    }

    const isMatchPassword = await bcrypt.compare(
      password,
      user.hashedPassword!
    );

    if (!isMatchPassword) {
      return new NextResponse("Password is incorrect", {
        status: 400,
      });
    }
    if (!user.emailVerified) {
      return new NextResponse("Email not verified", { status: 401 });
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const accessToken = signJwtAccessToken(payload);

    return NextResponse.json({ ...payload, accessToken });
  } catch (error) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse(
      errors.INTERNAL_ERROR.message,
      errors.INTERNAL_ERROR.status
    );
  }
}
