import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { errors } from "@/helpers/responseVariants";
import { signJwtToken } from "@/app/libs/jwt";
import { Account } from "@prisma/client";

interface IUser {
  id: string;
  email: string;
  name: string;
  image: string;
}

async function handler(request: Request) {
  try {
    const body = await request.json();
    const { user, account, password } = body;
    if (account?.providerAccountId) {
      return await handlerWithProvider(user, account);
    }
    return await handlerWithCredentials(user.email, password);
  } catch (error) {}
}

async function handlerWithCredentials(email: string, password: string) {
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

    if (!user.hashedPassword) {
      return new NextResponse("User exists, use Google or GitHub providers", {
        status: 400,
      });
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

async function handlerWithProvider(user: IUser, account: Account) {
  try {
    if (!user || !account) {
      return new NextResponse(
        errors.MISSING_INFO.message,
        errors.MISSING_INFO.status
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        image: user.image,
      },
    });

    const newAccount = await prisma.account.create({
      data: {
        provider: account.provider,
        type: account.type,
        providerAccountId: account.providerAccountId,
        access_token: account.access_token,
        expires_at: account.expires_at,
        scope: account.scope,
        token_type: account.token_type,
        id_token: account.id_token,
        user: {
          connect: {
            id: newUser.id,
          },
        },
      },
    });

    if (!newAccount || !newUser) {
      return new NextResponse(
        errors.USER_NOT_FOUND.message,
        errors.USER_NOT_FOUND.status
      );
    }

    if (newUser.email && newUser.name) {
      const payload = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };

      const accessToken = await signJwtToken(payload, "access");
      const refreshToken = await signJwtToken(payload, "refresh");
      await prisma.user.update({
        where: {
          id: newUser.id,
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
