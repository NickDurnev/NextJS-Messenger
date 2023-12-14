import prisma from "@/app/libs/prismadb";
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

    if (!user.emailVerified) {
      return new NextResponse("Email not verified", { status: 401 });
    }

    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (login?.ok && !login?.error) {
      return NextResponse.json(user);
    }
  } catch (error) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
