import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { errors } from "@/helpers/responseVariants";

export async function PATCH(request: Request) {
  const body = await request.json();
  const { verifyToken, id } = body;

  if (!verifyToken || !id) {
    return NextResponse.json("Missing required fields", { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        verificationToken: verifyToken,
        id: id,
      },
    });

    if (!user) {
      return new NextResponse(
        errors.USER_NOT_FOUND.message,
        errors.USER_NOT_FOUND.status
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: true,
        verificationToken: null,
      },
    });
    if (updatedUser) {
      return NextResponse.json("Email verified successfully");
    } else {
      return NextResponse.json("Failed to verify email", { status: 400 });
    }
  } catch (error) {
    console.error("Verify Email Error:", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
