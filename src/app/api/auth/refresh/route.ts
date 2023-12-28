import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { errors } from "@/helpers/responseVariants";
import { verifyJwt } from "@/app/libs/jwt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    console.log(refreshToken);

    if (!refreshToken) {
      return new NextResponse(
        errors.MISSING_INFO.message,
        errors.MISSING_INFO.status
      );
    }

    const verified = verifyJwt(refreshToken);

    if (!verified) {
      return new NextResponse(
        "Refresh token expired",
        errors.UNAUTHORIZED.status
      );
    }

    if (verified) {
      const user = await prisma.user.findUnique({
        where: {
          email: verified.email,
        },
      });

      if (!user) {
        return new NextResponse(
          errors.USER_NOT_FOUND.message,
          errors.USER_NOT_FOUND.status
        );
      }

      return NextResponse.json({ accessToken: user.accessToken });
    }
  } catch (error) {
    console.log(error, "REFRESH_ERROR");
    return new NextResponse(
      errors.INTERNAL_ERROR.message,
      errors.INTERNAL_ERROR.status
    );
  }
}
