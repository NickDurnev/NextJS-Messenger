import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { errors } from "@/helpers/responseVariants";
import { signJwtToken } from "@/app/libs/jwt";

async function handler(request: Request) {
  try {
    const body = await request.json();

    if (body.providerAccountId) {
      const { email, providerAccountId } = body;
      return await handlerWithProvider(email, providerAccountId);
    }
    const { email, password } = body;
    return await handlerWithCredentials(email, password);
  } catch (error) {}
}

export async function handlerWithCredentials(email: string, password: string) {
  try {
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
    console.log(error, "LOGIN_CREDENTIALS_ERROR");
    return new NextResponse(
      errors.INTERNAL_ERROR.message,
      errors.INTERNAL_ERROR.status
    );
  }
}

export async function handlerWithProvider(
  email: string,
  providerAccountId: string
) {
  try {
    if (!email || !providerAccountId) {
      return new NextResponse(
        errors.MISSING_INFO.message,
        errors.MISSING_INFO.status
      );
    }

    const account = await prisma.account.findUnique({
      where: {
        providerAccountId,
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!account || !user) {
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
      const refreshToken = await signJwtToken(payload, "refresh");
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          refreshToken,
          accessToken,
          emailVerified: true,
        },
      });
      return NextResponse.json({ ...payload, accessToken, refreshToken });
    }
  } catch (error) {
    console.log(error, "LOGIN_PROVIDER_ERROR");
    return new NextResponse(
      errors.INTERNAL_ERROR.message,
      errors.INTERNAL_ERROR.status
    );
  }
}

export { handler as POST };
