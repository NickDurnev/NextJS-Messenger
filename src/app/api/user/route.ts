import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { pusherServer } from "@/app/libs/pusher";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { errors } from "@/helpers/responseVariants";

export async function PATCH(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    if (!currentUser?.id) {
      return new NextResponse(
        errors.UNAUTHORIZED.message,
        errors.UNAUTHORIZED.status
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        ...body,
      },
    });

    await Promise.all(
      updatedUser.conversationIds.map(async (conversationId) => {
        await pusherServer.trigger(conversationId, "user:update", {
          userId: updatedUser.id,
          wasOnlineAt: updatedUser.wasOnlineAt,
        });
      })
    );

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, "ERROR_SETTINGS");
    return new NextResponse(
      errors.INTERNAL_ERROR.message,
      errors.INTERNAL_ERROR.status
    );
  }
}
