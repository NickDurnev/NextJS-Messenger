import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { errors } from "@/helpers/responseVariants";
import { signJwtToken } from "@/app/libs/jwt";

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

    if (user.email && user.name) {
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      const accessToken = await signJwtToken(payload, "access");
      const refreshToken = await signJwtToken(payload, "refresh");
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          refreshToken,
          accessToken,
        },
      });
      return NextResponse.json({ ...payload, accessToken, refreshToken });
    }
  } catch (error) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse(
      errors.INTERNAL_ERROR.message,
      errors.INTERNAL_ERROR.status
    );
  }
}
