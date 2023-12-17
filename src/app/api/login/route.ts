import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { signIn } from "next-auth/react";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
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

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
