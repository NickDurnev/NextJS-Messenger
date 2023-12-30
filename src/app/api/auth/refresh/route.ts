import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { errors } from "@/helpers/responseVariants";
import { signJwtToken, verifyJwt } from "@/app/libs/jwt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return new NextResponse(
        errors.MISSING_INFO.message,
        errors.MISSING_INFO.status
      );
    }

    const verified = await verifyJwt(refreshToken);

    if (!verified) {
      return new NextResponse(
        "Refresh token expired",
        errors.UNAUTHORIZED.status
      );
    }

    console.log(verified, "VERIFIED");

    if (verified) {
      const user = await prisma.user.findUnique({
        where: {
          email: verified?.email as string,
        },
      });

      if (!user) {
        return new NextResponse(
          errors.USER_NOT_FOUND.message,
          errors.USER_NOT_FOUND.status
        );
      }

      if (user.email && user.name) {
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
        };

        const accessToken = await signJwtToken(payload, "access");
        return NextResponse.json({ accessToken });
      }
    }
  } catch (error) {
    console.log(error, "REFRESH_ERROR");
    return new NextResponse(
      errors.INTERNAL_ERROR.message,
      errors.INTERNAL_ERROR.status
    );
  }
}
