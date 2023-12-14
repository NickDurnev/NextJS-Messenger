import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

const verifyEmail = async (verToken: string, id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        verificationToken: verToken,
        id: id,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
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
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("Verify Email Error", error);
  }
};

export default verifyEmail;
